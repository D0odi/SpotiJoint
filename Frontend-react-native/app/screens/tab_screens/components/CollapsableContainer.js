import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { LayoutChangeEvent, View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const CollapsableContainer = ({ children, expanded }) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    return {
      height: expanded ? withTiming(height) : withTiming(0),
    };
  }, [expanded, height]);

  return (
    <Animated.View
      style={[
        collapsableStyle,
        { overflow: "hidden", backgroundColor: "transparent" },
      ]}
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          flexDirection: "row",
        }}
        onLayout={onLayout}
      >
        {children}
      </View>
    </Animated.View>
  );
};
