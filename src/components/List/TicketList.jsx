import { Text, View } from "react-native";
import { thousandSeperator } from "../../utils/number";

const TicketList = ({ index, categoryName, percentage, amount }) => {
  return (
    <View
      key={index}
      className={`flex flex-row justify-between items-center py-4 mx-4 border-gray-300 border-t-[1px] ${
        index === 0 ? "border-t-0" : ""
      }`}
    >
      <View className="flex flex-row items-center">
        <Text className="text-prm font-medium">
          {categoryName} {percentage === "" ? "" : `(${percentage})`}
        </Text>
      </View>

      <Text className="text-prm font-medium text">Rp {thousandSeperator(amount)}</Text>
    </View>
  );
};

export default TicketList;
