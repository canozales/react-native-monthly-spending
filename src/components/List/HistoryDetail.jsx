import { Text, View } from "react-native";
import { thousandSeperator } from "../../utils/number";
import { formatDateStringToDayMonthYear } from "../../utils/datetime";

const HistoryDetail = ({ date, name, amount, notes }) => {
  return (
    <View className="bg-sec flex mb-3 py-[14px] px-4 rounded-lg">
      <View
        className={`${
          notes !== "" ? "border-prm border-b-[1px] border-dashed pb-[14px] " : ""
        } flex flex-row items-center justify-between`}
      >
        <View>
          <Text className="text-prm font-medium">{formatDateStringToDayMonthYear(date)}</Text>
          <Text className="text-prm font-normal">{name}</Text>
        </View>

        <Text className="text-prm font-bold text-[18px]">Rp {thousandSeperator(amount)}</Text>
      </View>

      {notes !== "" && <Text className="text-prm mt-3">{notes}</Text>}
    </View>
  );
};

export default HistoryDetail;
