import store from "@/redux/store";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import AppNavigation from "./app/navigation/AppNavigation";
export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_400Regular,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "grey",
      background: "#070119",
    },
  };
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
}
