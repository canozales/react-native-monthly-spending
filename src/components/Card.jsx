import { Text, View } from "react-native";
import { convertMoney } from "../utils/number";
import { thousandSeperator } from "../utils/number";
import { Downtrend, Uptrend } from "../../assets/svgs";

const Card = ({ title1, title2, title3, num1, num2, num3 }) => {
  const isNegative = num1.toString().includes("-");

  return (
    <View className="bg-prm px-4 py-5 rounded-xl my-5 flex -z-10">
      <Text className="text-white text-[15px] font-medium">{title1}</Text>
      <Text className="text-white text-[22px] font-bold">
        Rp {isNegative ? "0" : thousandSeperator(parseInt(num1))}
      </Text>

      <View className="flex flex-row items-center mt-5">
        <View className="flex flex-row gap-x-3">
          <View className="bg-white rounded-md p-1">
            <Downtrend />
          </View>
          <View className="flex">
            <Text className="text-white">{title2}</Text>
            <Text className="text-white font-bold">Rp {convertMoney(num2)}</Text>
          </View>
        </View>

        <View className="flex flex-row gap-x-3 ml-4">
          <View className="bg-white rounded-md p-1">
            <Uptrend />
          </View>
          <View className="flex">
            <Text className="text-white">{title3}</Text>
            <Text className="text-white font-bold">Rp {convertMoney(num3)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
