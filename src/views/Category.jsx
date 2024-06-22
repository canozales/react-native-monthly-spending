import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import { Text, View, ScrollView, Pressable } from "react-native";

import { categories } from "../data/category";
import { getSavedCategories } from "../services/db";

const Category = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadItems = async () => {
        try {
          const result = await getSavedCategories();
          setData(result);
        } catch {
          console.log("Something Wrong");
        }
      };
      loadItems();
    }, [])
  );

  return (
    <ScrollView className="bg-white">
      <Pressable
        className="flex flex-row items-center justify-end my-5 mx-5"
        onPress={() => navigation.navigate("CategoryInfo", { status: "add" })}
      >
        <AntDesign name="plus" size={20} color="#6965A8" />
        <Text className="text-prm font-bold ml-1">Add New</Text>
      </Pressable>

      <View className="bg-sec py-3 px-5">
        <Text className="text-prm font-bold">Lists</Text>
      </View>

      <View className="p-5 flex flex-row flex-wrap gap-2 items-center justify-start">
        {data.map((value, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate("CategoryInfo", {
                status: "edit",
                categoryName: value.categoryName,
                categoryImage: value.categoryImage,
                id: value.id,
              })
            }
            className="flex justify-center items-center bg-[#F6F6FE] py-2 px-4 rounded-lg"
          >
            {categories[value.categoryImage]}
            <Text className="mt-1 text-prm font-semibold">{value.categoryName}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default Category;
