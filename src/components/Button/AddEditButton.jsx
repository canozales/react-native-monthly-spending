import { Text, Pressable } from "react-native";

const AddEditButton = ({ editMode, editMsg, AddMsg, onPress }) => {
  return (
    <Pressable onPress={onPress} className="bg-prm p-4 rounded-lg mx-5 mt-10 ">
      <Text className="text-white text-center">{editMode ? editMsg : AddMsg}</Text>
    </Pressable>
  );
};

export default AddEditButton;
