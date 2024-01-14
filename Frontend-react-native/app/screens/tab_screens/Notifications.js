import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useEffect, useState } from "react";
import { LayoutAnimation } from "react-native";
import global from "../../styles";
import client from "../../api/client";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

export default Notifications = ({ route }) => {
  const { token } = route.params;
  const [requests, setRequests] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const iconSize = 20;

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

  const handleDelete = (itemToDelete) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setRequests(requests.filter((item) => item !== itemToDelete));
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
                    backgroundColor: "white",
                    borderRadius: 15,
                    marginVertical: 3,
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
                        color: global.spotify_black,
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: global.spotify_black_light,
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
                      activeOpacity={0.4}
                    >
                      <View
                        style={{
                          backgroundColor: global.blue_light,
                          borderRadius: 10,
                          padding: 6,
                        }}
                      >
                        <Ionicons name={"checkmark-outline"} size={20} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 5,
                      }}
                      activeOpacity={0.4}
                      onPress={() => handleDelete(item)}
                    >
                      <View
                        style={{
                          backgroundColor: global.red_light,
                          borderRadius: 10,
                          padding: 6,
                        }}
                      >
                        <Ionicons name={"close-outline"} size={20} />
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
  },
  notifications: {
    flex: 1,
    padding: 10,
    marginBottom: 65,
    backgroundColor: global.background,
    borderRadius: 15,
  },
});
