import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, View, Pressable } from "react-native";
import { thousandSeperator } from "../../utils/number";
import { formatDateStringToMonthYear } from "../../utils/datetime";

const HistoryList = ({ date, totalSpending }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("HistoryInfo", {
          date: date,
        })
      }
      className="bg-sec flex flex-row justify-between items-center mb-3 py-3 px-4 rounded-lg"
    >
      <View className="flex">
        <Text className="text-prm font-semibold text-[15px]">{formatDateStringToMonthYear(date)}</Text>
        <Text className="text-prm font-medium mt-1">Rp {thousandSeperator(totalSpending)}</Text>
      </View>

      <AntDesign name="right" size={24} color="#6965A8" />
    </Pressable>
  );
};

export default HistoryList;
