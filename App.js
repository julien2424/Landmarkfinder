import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./pages/home";
import { ResultScreen } from "./pages/result";
import { InfoScreen } from "./pages/info";
import { FilterScreen } from "./pages/filter";
import { OrientationScreen } from "./pages/orientaitionTest";

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("test app");

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Filter" component={OrientationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
