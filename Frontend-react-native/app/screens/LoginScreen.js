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

const { width } = Dimensions.get("window");

export default LoginScreen = ({ navigation }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollview = useRef();

  const fetchApi = async () => {
    try {
      const res = await axios.get("http://100.64.1.230:8000");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

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
    outputRange: [0, 40],
  });

  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,1)", "#rgba(27,27,51,0.6)"],
  });

  const signUpColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,0.6)", "#rgba(27,27,51,1)"],
  });

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
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
