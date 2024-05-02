import Home from "@/screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import ROUTES from "../constants/ROUTES";
import LandingPage from "../screens/LandingPage";
import QuizScreen from "@/screens/QuizScreen";
export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  const CustomHeader = () => {
    return null;
  };
  return (
    <Stack.Navigator screenOptions={{ header: CustomHeader }}>
      <Stack.Screen name={ROUTES.landingPage} component={LandingPage} />
      <Stack.Screen name={ROUTES.home} component={Home} />
      <Stack.Screen name={ROUTES.quizScreen} component={QuizScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
