import { StyleSheet, View, Button, Text } from "react-native";
import Header from "./components/header";
import Detail from "./pages/detail";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/home";
import Service from "./pages/service";
import SubService from "./pages/subService";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <View>
      <Home />
    </View>
  );
};

const ServiceScreen = () => {
  return (
    <View>
      <Service />
    </View>
  );
};

const SubServiceScreen = () => {
  return (
    <View>
      <SubService />
    </View>
  );
};

const DetailScreen = () => {
  return (
    <View>
      <Detail />
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <Header />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />

          <Stack.Screen name="Service" component={ServiceScreen} />

          <Stack.Screen name="SubService" component={SubServiceScreen} />

          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2fd",
    justifyContent: "flex-start",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default App;
