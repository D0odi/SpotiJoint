import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./drawer_screens/Home";
import Notifications from "./drawer_screens/Notifications";
import Search from "./drawer_screens/Search";
import CustomDrawerContent from "./drawer_screens/CustomDrawer";

const Drawer = createDrawerNavigator();

export default UserDomain = ({ route, navigation }) => {
  const { imageUri, name, nickname } = route.params;

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          imageUri={imageUri}
          name={name}
          nickname={nickname}
        />
      )}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Search" component={Search} />
    </Drawer.Navigator>
  );
};
