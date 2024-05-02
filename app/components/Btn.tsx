import FONTS from "@/constants/FONTS";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
export default function Btn({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#901081", "#af4a09"]}
        style={styles.btnStyle}
        start={{ x: 0.05, y: 0 }} // Adapte pour correspondre à ton gradient original de 105deg
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btnStyle: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontFamily: FONTS.primaryFontBold,
  },
});
