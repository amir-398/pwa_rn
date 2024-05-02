import BackgroundComponent from "@/components/BackgroundComponent";
import FONTS from "@/constants/FONTS";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setNumberOfAnsweredQuestions,
  setScore,
} from "@/redux/slices/questionsSlice";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import he from "he";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const height = Dimensions.get("window").height;
export default function QuizScreen({ route }) {
  const { selectDifficulty, selectCategory } = route.params;
  const dispatch = useAppDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [count, setCount] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion);

  const score = useAppSelector((state) => state.questionsSlice.score);
  const numberOfAnsweredQuestions = useAppSelector(
    (state) => state.questionsSlice.NumberOfAnsweredQuestions
  );
  const [loading, setLoading] = useState(false);

  // get questions from api
  const getQuestion = async () => {
    setLoading(true); // Assurez-vous que setLoading est défini quelque part dans votre composant
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&type=multiple&category=${
          selectCategory == 0 ? "" : selectCategory
        }&difficulty=${selectDifficulty == null ? "" : selectDifficulty}`
      );
      const questions = response.data.results.map((question) => {
        // Décode les entités HTML dans la question et les réponses
        const decodedQuestion = he.decode(question.question);
        const decodedCorrectAnswer = he.decode(question.correct_answer);
        const decodedIncorrectAnswers = question.incorrect_answers.map(
          (answer) => he.decode(answer)
        );
        const decodedCategory = he.decode(question.category);

        question.question = decodedQuestion;
        question.correct_answer = decodedCorrectAnswer;
        question.incorrect_answers = decodedIncorrectAnswers;
        question.category = decodedCategory;

        question.answers = [
          ...decodedIncorrectAnswers,
          decodedCorrectAnswer,
        ].sort(() => Math.random() - 0.5);
        return question;
      });
      setQuestions(questions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // get questions when component mount
  useEffect(() => {
    getQuestion();
  }, []);

  // reset count when selected answer
  useEffect(() => {
    if (selectedAnswer) setCount(0);
  }, [selectedAnswer]);

  // handle timer
  const handleTimer = () => {
    if (count > 0) {
      const timer = setTimeout(
        () => setCount((prevCount) => Math.max(prevCount - 0.05, 0)),
        10
      );
      return () => clearTimeout(timer);
    }
  };
  // excute handleTimer when count change
  useEffect(() => {
    handleTimer();

    if (count == 0) {
      if (selectedAnswer == currentQuestion?.correct_answer) {
        dispatch(setScore(1));
      }
      dispatch(setNumberOfAnsweredQuestions(1));
    }
  }, [count]);

  const handleContinue = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setCount(10);
    setSelectedAnswer(null);
    if (currentQuestionIndex == questions.length - 1) {
      setCurrentQuestionIndex(0);
      getQuestion();
    }
  };
  if (loading) {
    return (
      <BackgroundComponent>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height,
          }}
        >
          <ActivityIndicator size={60} color={"#901081"} />
        </View>
      </BackgroundComponent>
    );
  }
  return (
    <BackgroundComponent>
      <View style={styles.container}>
        <View>
          <View style={styles.recapContainer}>
            <Text style={styles.headerText}>
              Score : <Text style={styles.recapText}> {score}</Text>
            </Text>
            <Text style={styles.headerText}>
              Questions répondues :
              <Text style={styles.recapText}> {numberOfAnsweredQuestions}</Text>
            </Text>
            <Text style={styles.headerText}>
              Catégorie :{" "}
              <Text style={styles.recapText}>{currentQuestion?.category}</Text>
            </Text>
            <Text style={styles.difficultyText}>
              Difficulté :{" "}
              <Text style={{ color: "#af4a09", textTransform: "capitalize" }}>
                {currentQuestion?.difficulty}
              </Text>
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.questionText}>{currentQuestion?.question}</Text>
        </View>
        <View>
          <View style={styles.answersContainer}>
            {currentQuestion?.answers?.map((answer, index) =>
              count == 0 ? (
                <View
                  style={[
                    styles.answerWrap,
                    {
                      backgroundColor:
                        answer == currentQuestion?.correct_answer
                          ? "green"
                          : "red",
                    },
                  ]}
                  key={index}
                >
                  <Text style={styles.answerText}>{answer}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.answerWrap}
                  key={index}
                  onPress={() => setSelectedAnswer(answer)}
                >
                  <Text style={styles.answerText}>{answer}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
          {count == 0 ? (
            <Pressable onPress={handleContinue}>
              <Text style={styles.nextText}>-- Appuyer pour continuer --</Text>
            </Pressable>
          ) : (
            <LinearGradient
              colors={["#901081", "#af4a09"]}
              style={[styles.progressBar, { width: `${count * 10}%` }]}
              start={{ x: 0.05, y: 0 }} // Adapte pour correspondre à ton gradient original de 105deg
              end={{ x: 1, y: 0 }}
            ></LinearGradient>
          )}
        </View>
      </View>
    </BackgroundComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: height,
  },
  recapContainer: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: FONTS.primaryFontMedium,
  },
  recapText: {
    color: "#af4a09",
    fontFamily: FONTS.primaryFontBold,
    fontSize: 15,
  },
  difficultyText: {
    color: "#fff",
    fontFamily: FONTS.primaryFontBold,
    fontSize: 10,
    position: "absolute",
    left: 10,
    top: 5,
  },
  questionContainer: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  questionText: {
    color: "#fff",
    fontFamily: FONTS.primaryFontMedium,
    fontSize: 20,
    textAlign: "center",
  },
  answersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  answerWrap: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    padding: 30,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
  },
  answerText: {
    color: "#fff",
    fontFamily: FONTS.primaryFontMedium,
    fontSize: 15,
    textAlign: "center",
  },
  progressBar: {
    height: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  nextText: {
    color: "#fff",
    fontFamily: FONTS.primaryFontMedium,
    fontSize: 15,
    textAlign: "center",
    marginVertical: 12.5,
  },
});
