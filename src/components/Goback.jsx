import { Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Goback = ({ msg }) => {
  const navigation = useNavigation();

  return (
    <Pressable className="flex flex-row items-center p-5" onPress={() => navigation.goBack()}>
      <AntDesign name="left" size={20} color="#6965A8" />
      <Text className="text-prm font-bold ml-1">{msg}</Text>
    </Pressable>
  );
};

export default Goback;
