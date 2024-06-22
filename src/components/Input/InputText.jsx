import { Text, TextInput } from "react-native";

const InputText = ({ title, value, keyboardType, onChangeText, maxLength = 25 }) => {
  return (
    <>
      <Text className="text-prm font-bold m-5 mb-2">{title}</Text>
      <TextInput
        className="bg-sec border-prm text-prm border-[1.5px] py-2 px-3 mx-5 rounded-[7px]"
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        maxLength={maxLength}
        selectionColor={"#6965A8"}
      />
    </>
  );
};

export default InputText;
