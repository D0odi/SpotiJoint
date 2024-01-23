import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useEffect, useState, useContext } from "react";
import { ActivityIndicator } from "react-native";
import SongDisplay from "./components/SongDisplay";
import global from "../../styles";
import { AppContext } from "../../contexts/AppContext";
import client from "../../api/client";

export default Home = ({ route }) => {
  const { token_s, spotifyAPI, loggedInUser, token } = useContext(AppContext);

  const [userInfo_s, setUserInfo_s] = useState({});
  const [friendsData, setFriendsData] = useState(null);

  const fetchRequests = async () => {
    const res = await client.get("/users", {
      headers: {
        Auth: `JWT ${token}`,
        Filter: "home-screen",
      },
    });
    console.log(`Home Screen Friends: ${res.data.filtered_users}`);
    setFriendsData(res.data.filtered_users);
  };

  const fetchUserProfile = async () => {
    if (token_s && spotifyAPI) {
      const userInfo = await spotifyAPI.fetchUserProfile(token_s);
      setUserInfo_s(userInfo);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchRequests();
  }, []);

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
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("./components/assets/spotify_icon.png")}
                />
              </View>
            </View>
          </View>
          <View style={styles.currentSong}>
            <SongDisplay />
          </View>
        </>
      )}
      <View style={styles.friends}>
        <FlatList
          data={friendsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                padding: 5,
              }}
            >
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentSong: {
    height: 70,
    backgroundColor: global.spotify_white,
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  friends: {
    flex: 1,
    padding: 5,
    marginBottom: 65,
    backgroundColor: global.spotify_white,
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
    marginBottom: 10,
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
