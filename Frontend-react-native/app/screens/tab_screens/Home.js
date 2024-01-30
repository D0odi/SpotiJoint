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

export default Home = ({ route }) => {
  const { token_s, spotifyAPI, loggedInUser, token } = useContext(AppContext);

  const [userInfo_s, setUserInfo_s] = useState({});
  const [friendsData, setFriendsData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await client.get("/users", {
        headers: {
          Auth: `JWT ${token}`,
          Filter: "home-screen",
        },
      });
      console.log("FRIENDS: ", JSON.stringify(res.data.filtered_users));
      setFriendsData(res.data.filtered_users);
    };

    fetch();
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

  const [expandedItems, setExpandedItems] = useState({});

  const handlePress = (index) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the expanded state for this item
    }));
  };

  return (
    <View style={styles.container}>
      {token_s && userInfo_s && spotifyAPI && (
        <>
          <View style={styles.outerContainer}>
            <View style={styles.userContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: userInfo_s.avatar }}
              />
              <Text style={[styles.name, styles.text_info]}>
                {userInfo_s.name}
              </Text>
              <View style={styles.dot} />
              <Text style={[styles.location, styles.text_info]}>
                {userInfo_s.location}
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                <Entypo name="spotify" size={30} color={global.spotify_green} />
              </View>
            </View>
          </View>
          <SongDisplay />
        </>
      )}
      <View style={styles.friendsContainer}>
        <MasonryFlashList
          estimatedItemSize={5}
          numColumns={3}
          data={friendsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => handlePress(index)}
              style={styles.friends}
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <TextTicker
                style={{ fontSize: 12 }}
                duration={20000}
                loop
                bounce
                repeatSpacer={30}
                marqueeDelay={0}
              >
                Super long piece of text is long. The quick brown fox jumps over
                the lazy dog.
              </TextTicker>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  friends: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: global.blue_50,
    borderRadius: 5,
    margin: 3,
  },
  friendsContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: global.spotify_grey,
    borderRadius: 15,
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: global.background,
  },
  userContainer: {
    flex: 1,
    backgroundColor: global.spotify_white,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    padding: 15,
  },
  outerContainer: {
    flexDirection: "row",
    padding: 2,
    borderRadius: 17,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  text_info: {
    fontSize: 13,
    fontWeight: "bold",
    color: global.spotify_black,
  },
  name: {
    textAlign: "right",
    marginLeft: 10,
    color: global.blue,
    fontWeight: "bold",
  },
  location: {
    textAlign: "left",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2.5,
    backgroundColor: global.spotify_black_light,
    marginHorizontal: 10,
  },
});
