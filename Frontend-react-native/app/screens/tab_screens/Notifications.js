import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import { LayoutAnimation } from "react-native";
import global from "../../styles";
import client from "../../api/client";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppContext } from "../../contexts/AppContext";

export default Notifications = ({ route }) => {
  const { token } = useContext(AppContext);
  const [requests, setRequests] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
    setRefreshing(false);
  };

  const fetchRequests = async () => {
    const res = await client.get("/users", {
      headers: {
        Auth: `JWT ${token}`,
        Filter: "notifications-screen",
      },
    });
    setRequests(res.data.filtered_users);
  };

  const respondToRequest = async (item, action) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setRequests(requests.filter((renderedItem) => renderedItem !== item));

    const res = await client.post(
      "/respond-to-request",
      { action: action, req_user_id: item._id },
      {
        headers: {
          Accept: "application/json",
          Auth: `JWT ${token}`,
        },
      }
    );

    console.log(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <View style={styles.container}>
      {requests && (
        <View style={styles.notifications}>
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={requests}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    padding: 5,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <Image
                      source={{ uri: item.avatar }}
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      flex: 1,
                      marginHorizontal: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: global.spotify_white,
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: global.spotify_light_grey,
                      }}
                    >
                      Wants to connect
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 5,
                      }}
                      onPress={() => respondToRequest(item, "accept")}
                      activeOpacity={0.4}
                    >
                      <View
                        style={{
                          backgroundColor: global.spotify_white_50,
                          borderRadius: 10,
                          padding: 6,
                        }}
                      >
                        <Ionicons
                          name={"checkmark"}
                          size={20}
                          color={global.spotify_white}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 5,
                      }}
                      activeOpacity={0.4}
                      onPress={() => respondToRequest(item, "decline")}
                    >
                      <View
                        style={{
                          backgroundColor: global.spotify_grey,
                          borderRadius: 10,
                          padding: 6,
                        }}
                      >
                        <Ionicons
                          name={"close"}
                          size={20}
                          color={global.spotify_white}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.background,
    padding: 10,
  },
  notifications: {
    flex: 1,
    padding: 5,
  },
});
