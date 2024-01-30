import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { ActivityIndicator } from "react-native";
import SongDisplay from "./components/SongDisplay";
import global from "../../styles";
import { AppContext } from "../../contexts/AppContext";
import client from "../../api/client";
import { socket } from "../../api/client";
import { AnimatedFlashList, MasonryFlashList } from "@shopify/flash-list";
import { Entypo } from "@expo/vector-icons";
import TextTicker from "react-native-text-ticker";
import { generateRandom } from "expo-auth-session/build/PKCE";

export default Home = ({ route }) => {
  const { token_s, spotifyAPI, loggedInUser, token } = useContext(AppContext);
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

  const handlePress = (index) => {
    // modal of user
  };

  return (
    <View style={styles.container}>
      {token_s && userInfo_s && spotifyAPI && (
        <>
          <View style={styles.userContainer}>
            <Image style={styles.avatar} source={{ uri: userInfo_s.avatar }} />
            <View
              style={{
                flex: 1,
                marginLeft: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>{userInfo_s.name}</Text>
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
        </>
      )}
      <View
        style={{
          marginVertical: 10,
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
      </View>
      <View style={styles.friendsContainer}>
        <MasonryFlashList
          refreshing={refreshing}
          onRefresh={onRefresh}
          estimatedItemSize={5}
          numColumns={3}
          data={friendsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => handlePress()}
              style={styles.friend}
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text
                style={[
                  styles.text,
                  { textAlign: "center", fontSize: 11, marginVertical: 5 },
                ]}
              >
                {item.name}
              </Text>
              <TextTicker
                style={{ fontSize: 11, color: global.spotify_white_50 }}
                duration={10000}
                loop
                bounce
                repeatSpacer={30}
                marqueeDelay={3000}
              >
                Puk pukileo ss
              </TextTicker>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  friend: {
    alignItems: "center",
    justifyContent: "center",
    padding: 13,
    backgroundColor: global.spotify_grey,
    borderRadius: 5,
    marginRight: 6,
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
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 0,
    borderRadius: 7,
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
    textAlign: "right",
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
