import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { initDatabase } from "../services/db";

const Loading = ({ navigation }) => {
  useEffect(() => {
    const loading = async () => {
      try {
        await initDatabase();
        navigation.replace("Home");
      } catch {
        console.log("initDatabase Failed");
      }
    };

    loading();
  }, []);

  return (
    <View className="bg-prm w-full h-screen flex justify-center items-center">
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default Loading;
