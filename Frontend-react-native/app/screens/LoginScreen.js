import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from "react-native";
import Header from "../components/login/Header";
import SelectorBtn from "../components/login/form_components/SelectorBtn";
import SignUpForm from "../components/login/SignUpForm";
import LoginForm from "../components/login/LoginForm";
import { useEffect, useRef } from "react";
import axios from "axios";
import global from "../styles";
import { SafeAreaView } from "react-native";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

const { width } = Dimensions.get("window");

export default LoginScreen = ({ navigation }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollview = useRef();

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });

  const rightHeaderTransalteY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });

  const leftHeaderTransalteX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 30],
  });

  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: [global.spotify_light_grey, global.spotify_grey],
  });

  const signUpColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: [global.spotify_grey, global.spotify_light_grey],
  });

  const autoLogin = () => {};

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftHeading="Welcome "
        rightHeading="Back"
        subHeading="Backed by Node.js"
        rightHeaderOpacity={rightHeaderOpacity}
        rightHeaderTransalteY={rightHeaderTransalteY}
        leftHeaderTransalteX={leftHeaderTransalteX}
      />
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingBottom: 15,
          paddingTop: 20,
        }}
      >
        <SelectorBtn
          onPress={() => {
            scrollview.current.scrollTo({ x: 0 });
          }}
          style={styles.borderLeft}
          backgroundColor={loginColorInterpolate}
          text="Login"
        />
        <SelectorBtn
          onPress={() => {
            scrollview.current.scrollTo({ x: width });
          }}
          style={styles.borderRight}
          backgroundColor={signUpColorInterpolate}
          text="Sign up"
        />
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animation } } }],
          { useNativeDriver: false }
        )}
        ref={scrollview}
      >
        <LoginForm navigation={navigation} />
        <ScrollView>
          <SignUpForm navigation={navigation} />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.background,
    paddingTop: 50,
  },
  borderLeft: {
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  borderRight: {
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
});
