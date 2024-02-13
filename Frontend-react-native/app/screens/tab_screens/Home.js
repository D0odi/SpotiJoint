import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Modal,
  LayoutAnimation,
} from "react-native";
import { BlurView } from "expo-blur";
import { useEffect, useState, useContext, useRef } from "react";
import Animated, { FadeIn, FadeInUp, Layout } from "react-native-reanimated";
import SongDisplay from "./components/SongDisplay";
import global from "../../styles";
import { AppContext } from "../../contexts/AppContext";
import { client, socket } from "../../api/client";
import {
  AnimatedFlashList,
  FlashList,
  MasonryFlashList,
} from "@shopify/flash-list";
import { Entypo } from "@expo/vector-icons";
import TextTicker from "react-native-text-ticker";
import { generateRandom } from "expo-auth-session/build/PKCE";
import ActionSheet from "react-native-actions-sheet";
import { UserCardFriend } from "./components/UserCardFriend";

export default Home = ({ route }) => {
  const { token_s, spotifyAPI, loggedInUser, token, homeBackground } =
    useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);
  const [userInfo_s, setUserInfo_s] = useState({});
  const [friendsData, setFriendsData] = useState(null);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFriends().then(() => setRefreshing(false));
  };

  const fetchFriends = async () => {
    const res = await client.get("/users", {
      headers: {
        Auth: `JWT ${token}`,
        Filter: "home-screen",
      },
    });
    console.log("FRIENDS: ", JSON.stringify(res.data.filtered_users));
    setFriendsData(res.data.filtered_users);
  };

  useEffect(() => {
    const fetchFriendsHelper = async () => {
      await fetchFriends();
    };

    fetchFriendsHelper();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (token_s && spotifyAPI) {
        const userInfo = await spotifyAPI.fetchUserProfile(token_s);
        console.log("USERINFO: ", userInfo);

        setUserInfo_s(userInfo);
      }
    };

    fetch();
  }, [token_s, spotifyAPI]);

  return (
    <View style={styles.container}>
      {token_s && userInfo_s && spotifyAPI && (
        <Animated.View entering={FadeInUp} layout={Layout}>
          <View style={styles.userContainer}>
            {userInfo_s.avatar && (
              <Image
                style={styles.avatar}
                source={{ uri: userInfo_s.avatar }}
              />
            )}
            <View
              style={{
                flex: 1,
                marginLeft: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>{userInfo_s.username}</Text>
              <View style={styles.dot} />
              <Text
                style={[
                  styles.text,
                  {
                    color: global.spotify_light_grey,
                    fontWeight: "normal",
                    fontSize: 11,
                  },
                ]}
              >
                {userInfo_s.location}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <Entypo name="spotify" size={30} color={global.spotify_green} />
            </View>
          </View>
          <SongDisplay />
        </Animated.View>
      )}
      <Animated.View
        layout={Layout}
        style={{
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: global.spotify_white,
          }}
        >
          Friends
        </Text>
      </Animated.View>
      <Animated.View style={styles.friendsContainer} layout={Layout}>
        <FlashList
          refreshing={refreshing}
          onRefresh={onRefresh}
          estimatedItemSize={5}
          data={friendsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <UserCardFriend index={index} item={item} />
          )}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  friend: {
    padding: 7,
    backgroundColor: global.spotify_grey,
    borderRadius: 5,
    marginBottom: 6,
  },
  friendsContainer: {
    flex: 1,
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: global.background,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    paddingLeft: 0,
  },
  outerContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  text: {
    color: global.spotify_white,
    fontWeight: "bold",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2.5,
    backgroundColor: global.spotify_light_grey,
    marginHorizontal: 10,
  },
});
