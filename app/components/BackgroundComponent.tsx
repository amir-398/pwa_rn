import img_bg from "@/assets/bg.png";
import Constants from "expo-constants";
import React from "react";
import { ImageBackground, ScrollView } from "react-native";
export default function BackgroundComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ImageBackground
      source={img_bg}
      resizeMode="repeat"
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 10,
      }}
    >
      <ScrollView>{children}</ScrollView>
    </ImageBackground>
  );
}
