import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/views/Home";
import Loading from "./src/views/Loading";
import History from "./src/views/History";
import Category from "./src/views/Category";
import SpendingInfo from "./src/views/SpendingInfo";
import CategoryInfo from "./src/views/CategoryInfo";
import HistoryInfo from "./src/views/HistoryInfo";
import Configurations from "./src/views/Configurations";

const Stack = createNativeStackNavigator();

const Navigator = ({ children }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="SpendingInfo" component={SpendingInfo} />
        <Stack.Screen name="CategoryInfo" component={CategoryInfo} />
        <Stack.Screen name="HistoryInfo" component={HistoryInfo} />
        <Stack.Screen name="Configurations" component={Configurations} />
      </Stack.Navigator>

      {children}
    </NavigationContainer>
  );
};

export default Navigator;
