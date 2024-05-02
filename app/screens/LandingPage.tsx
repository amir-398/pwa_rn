import quiz_img from "@/assets/quiz.png";
import Btn from "@/components/Btn";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import BackgroundComponent from "app/components/BackgroundComponent";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
const height = Dimensions.get("window").height;
export default function LandingPage({ navigation }) {
  const [name, setName] = useState("");
  const onSubmit = () => {
    if (!name) return alert("Veuillez entrer votre nom");

    navigation.push(ROUTES.home, { name });
  };

  return (
    <BackgroundComponent>
      <View style={{ height: height * 0.9 }}>
        <Image source={quiz_img} style={styles.img} />
        <Text style={styles.text}>Quel est votre nom, commandant ?</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor={"#fff"}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <Btn title="Commencer" onPress={onSubmit} />
    </BackgroundComponent>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: FONTS.primaryFontBold,
  },
  img: {
    width: 180,
    height: 150,
    alignSelf: "center",
    marginVertical: 50,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
    fontFamily: FONTS.primaryFont,
    color: "#fff",
    zIndex: 1,
  },
});
