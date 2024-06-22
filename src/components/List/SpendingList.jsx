import { AntDesign } from "@expo/vector-icons";
import { categories } from "../../data/category";
import { thousandSeperator } from "../../utils/number";
import { Text, View, Pressable } from "react-native";

const SpendingList = ({ data, command }) => {
  return (
    <Pressable
      onPress={command}
      className="bg-sec flex flex-row justify-between items-center mb-3 py-[14px] px-4 rounded-lg"
    >
      <View className="flex flex-row items-center">
        {categories[data.categoryImage]}

        <View className="flex ml-[15px]">
          <Text className="text-prm font-bold">{data.categoryName}</Text>
          <Text className="text-prm font-medium">Rp {thousandSeperator(data.amount)}</Text>
        </View>
      </View>

      <AntDesign name="right" size={24} color="#6965A8" />
    </Pressable>
  );
};

export default SpendingList;
