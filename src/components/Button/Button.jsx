import { Pressable, Text } from "react-native";

export const BackgroundButton = ({ title, onPress, customClass }) => (
  <Pressable onPress={onPress} className={`${customClass} bg-prm p-4 rounded-lg mx-5`}>
    <Text className="text-white text-center">{title}</Text>
  </Pressable>
);

export const OutlineButton = ({ title, onPress, customClass }) => (
  <Pressable onPress={onPress} className={`border-prm border-[1px] p-4 rounded-lg mx-5 ${customClass}`}>
    <Text className="text-prm text-center">{title}</Text>
  </Pressable>
);
