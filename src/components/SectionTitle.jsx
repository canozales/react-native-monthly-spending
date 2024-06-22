import { Text, View } from "react-native";

const SectionTitle = ({ msg }) => {
  return (
    <View className="bg-sec py-3 px-5">
      <Text className="text-prm font-bold">{msg}</Text>
    </View>
  );
};

export default SectionTitle;
