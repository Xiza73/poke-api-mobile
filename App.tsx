import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BasicDetail from "./src/screens/BasicDetail";
import Home from "./src/screens/Home";
import PokeRegister from "./src/screens/PokeRegister";
import { PokeProvider } from "./src/context/PokeProvider";

const Stack = createStackNavigator();

const App = () => {
  return (
    <PokeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Register" component={PokeRegister}></Stack.Screen>
          <Stack.Screen
            name="Basic Details"
            component={BasicDetail}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PokeProvider>
  );
};

export default App;
