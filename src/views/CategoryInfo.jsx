import Goback from "../components/Goback";
import SectionTitle from "../components/SectionTitle";
import InputText from "../components/Input/InputText";
import InputIcon from "../components/Input/InputIcon";
import AddEditButton from "../components/Button/AddEditButton";

import { useToast } from "react-native-toast-notifications";
import { useState } from "react";
import { ScrollView } from "react-native";
import { categoryLists } from "../data/category";
import { addToCategories, editCategories, updateCategoryName, updateCategoryImage } from "../services/db";

const CategoryInfo = ({ route, navigation }) => {
  const { status, categoryName, categoryImage, id } = route.params;

  const toast = useToast();
  const editMode = status === "edit";

  const previousName = editMode ? categoryName : "";
  const previousImage = editMode ? categoryImage : "";

  const [name, setName] = useState(editMode ? categoryName : "");
  const [image, setImage] = useState(editMode ? categoryImage : "");

  const handleAddCategory = async () => {
    if (name === "" || image === "") {
      toast.show("Incomplete Data", { type: "normal" });
    } else {
      if (editMode) {
        try {
          await editCategories(id, name, image);
          if (previousName !== name) await updateCategoryName(previousName, name);
          if (previousImage !== image) await updateCategoryImage(previousImage, image);

          toast.show("Category Has been Updated", { type: "normal" });
          navigation.goBack();
        } catch {
          toast.show("Error on Update Category", { type: "normal" });
        }
      } else {
        try {
          await addToCategories(name, image);
          toast.show("Category Has been Added", { type: "normal" });
          navigation.goBack();
        } catch {
          toast.show("Error on Insert Category", { type: "normal" });
        }
      }
    }
  };

  return (
    <ScrollView className="bg-white relative">
      <Goback msg="Back to Category" />
      <SectionTitle msg="Category Information" />

      <InputText title="Name" value={name} onChangeText={setName} keyboardType="default" />
      <InputIcon {...{ title: "Picture", image, setImage, categoryLists }} />

      <AddEditButton {...{ editMode, editMsg: "Edit Category", AddMsg: "Add Category", onPress: handleAddCategory }} />
    </ScrollView>
  );
};

export default CategoryInfo;
