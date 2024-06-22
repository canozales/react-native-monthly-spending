import { Text, View, Pressable, ImageBackground } from "react-native";

const InputIcon = ({ title, categoryLists, image, setImage }) => {
  return (
    <>
      <Text className="text-prm font-bold m-5 mb-2">{title}</Text>

      <View className="p-5 flex flex-wrap flex-row gap-2 items-center justify-center">
        {categoryLists.map((e, index) => (
          <Pressable
            key={index}
            onPress={() => setImage(e.name)}
            className={`${
              e.name === image ? "border-prm" : "border-sec"
            } bg-sec border-[2px] flex justify-center items-center  py-6 px-4 rounded-lg`}
          >
            {e.image}
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default InputIcon;
