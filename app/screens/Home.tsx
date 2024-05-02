import astronaute_img from "@/assets/astronaute.jpg";
import BackgroundComponent from "@/components/BackgroundComponent";
import Btn from "@/components/Btn";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setNumberOfAnsweredQuestions,
  setScore,
} from "@/redux/slices/questionsSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const height = Dimensions.get("window").height;

export default function Home({ route, navigation }) {
  const dispatch = useAppDispatch();
  const { name } = route.params;
  const [selectDifficulty, setSelectDifficulty] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([
    { id: 0, name: "Any Difficulty", value: null },
    { id: 1, name: "Easy", value: "easy" },
    { id: 2, name: "Medium", value: "medium" },
    { id: 3, name: "Hard", value: "hard" },
  ]);

  const score = useAppSelector((state) => state.questionsSlice.score);
  const numberOfAnsweredQuestions = useAppSelector(
    (state) => state.questionsSlice.NumberOfAnsweredQuestions
  );

  // get categories from api
  const getCatgories = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api_category.php");
      const categories = response.data.trivia_categories;
      //sort categories by name
      const sortedCategories = categories.sort(
        (
          a: Record<string, string | number>,
          b: Record<string, string | number>
        ) => (a.name > b.name ? 1 : -1)
      );
      // add any  categories
      sortedCategories.unshift({
        id: 0,
        name: "Any Category",
      });
      setCategories(sortedCategories);
    } catch (error) {
      console.error(error);
    }
  };

  // execute getCatgories on component mount
  useEffect(() => {
    getCatgories();
  }, []);

  // handle btn Submit
  const onSubmit = () => {
    // navigate to quiz screen
    navigation.push(ROUTES.quizScreen, {
      selectDifficulty,
      selectCategory,
    });
  };

  // reset score
  const resetScore = () => {
    dispatch(setScore(-score));
    dispatch(setNumberOfAnsweredQuestions(-numberOfAnsweredQuestions));
  };
  return (
    <BackgroundComponent>
      <View style={{ height: height * 0.9 }}>
        <Text style={styles.headerTitle}>Quiz</Text>
        <Image style={styles.img} source={astronaute_img} />
        <Text style={styles.title}>
          Bienvenue, <Text style={{ color: "#901081" }}>{name}</Text> !
        </Text>
        <View style={styles.recapContainer}>
          <View style={styles.recapLeft}>
            <Text style={styles.recapText}>Votre Score : {score}</Text>
            <Text style={styles.recapText}>
              Questions répondues : {numberOfAnsweredQuestions}
            </Text>
          </View>
          <View style={styles.recapRight}>
            <TouchableOpacity onPress={resetScore}>
              <LinearGradient
                colors={["#901081", "#af4a09"]}
                style={styles.btnStyle}
                start={{ x: 0.05, y: 0 }} // Adapte pour correspondre à ton gradient original de 105deg
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="refresh" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.selectContainer}>
          <Text style={styles.title}>Choisissez votre difficulté :</Text>
          <Picker
            selectedValue={selectDifficulty}
            onValueChange={(itemValue, itemIndex) =>
              setSelectDifficulty(itemValue)
            }
            style={styles.selectInput}
          >
            {difficulties.map((difficulty) => (
              <Picker.Item
                key={difficulty.id}
                label={difficulty.name}
                value={difficulty.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.selectContainer}>
          <Text style={styles.title}>Choisissez une catégorie :</Text>
          <Picker
            selectedValue={selectCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSelectCategory(itemValue)
            }
            style={styles.selectInput}
          >
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Btn
          title={
            numberOfAnsweredQuestions > 0 ? "Continuer !" : "C'est parti !"
          }
          onPress={onSubmit}
        />
      </View>
    </BackgroundComponent>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
    fontFamily: FONTS.primaryFontBold,
  },
  img: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 100,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontFamily: FONTS.primaryFontBold,
  },
  recapContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    flexDirection: "row",
    height: 60,
  },
  recapLeft: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  recapRight: {
    width: "20%",
  },
  btnStyle: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  recapText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    fontFamily: FONTS.primaryFontBold,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#fff",
    marginVertical: 20,
  },
  selectContainer: {
    marginBottom: 60,
  },
  selectInput: {
    height: 10,
    color: "#fff",
    fontFamily: FONTS.primaryFont,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
  },
  btnContainer: {
    height: height * 0.1,
  },
});
