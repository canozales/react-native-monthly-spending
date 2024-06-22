import { useState } from "react";
import { ScrollView } from "react-native";
import { useToast } from "react-native-toast-notifications";

import { categories } from "../data/category";
import { insertItem, updateItem } from "../services/db";
import { thousandSeperator } from "../utils/number";
import { convertDateToString, convertStringToDate } from "../utils/datetime";

import AddEditButton from "../components/Button/AddEditButton";
import Goback from "../components/Goback";
import SectionTitle from "../components/SectionTitle";
import InputText from "../components/Input/InputText";
import InputDropdown from "../components/Input/InputDropdown";
import InputDate from "../components/Input/InputDate";

const SpendingInfo = ({ route, navigation }) => {
  const { status, data } = route.params;

  const toast = useToast();
  const editMode = status === "edit";

  const invalidDate = (otherDate) => {
    const today = new Date();

    // Greater than today (In the future)
    if (otherDate > today) return true;

    // Previous Month
    // if (otherDate.getMonth() !== today.getMonth() || otherDate.getFullYear() !== today.getFullYear()) return true;

    return false;
  };

  const [date, setDate] = useState(editMode ? convertStringToDate(data.date) : new Date());
  const [notes, setNotes] = useState(editMode ? data.notes : "");
  const [amount, setAmount] = useState(editMode ? thousandSeperator(data.amount) : "");
  const [category, setCategory] = useState(editMode ? { name: data.categoryName, image: data.categoryImage } : {});

  const handleSubmit = () => {
    if (amount === "" || Object.values(category).length === 0) {
      toast.show("Incomplete Data", { type: "normal" });
    } else if (invalidDate(date)) {
      toast.show("Invalid Date", { type: "normal" });
    } else {
      if (editMode) {
        updateItem(data.id, amount, category.name, category.image, convertDateToString(date), notes)
          .then(() => {
            toast.show("Spending Has been Updated", { type: "normal" });
            navigation.navigate("Home");
          })
          .catch(() => toast.show("Error on Update Spending", { type: "normal" }));
      } else {
        insertItem(amount, category.name, category.image, convertDateToString(date), notes)
          .then(() => {
            toast.show("Spending Has been Added", { type: "normal" });
            navigation.navigate("Home");
          })
          .catch(() => toast.show("Error on Insert Spending", { type: "normal" }));
      }
    }
  };

  return (
    <ScrollView className="bg-white relative">
      <Goback msg={"Back"} />
      <SectionTitle msg={"Spending Information"} />

      <InputText
        {...{
          title: "Amount",
          keyboardType: "number-pad",
          value: amount,
          onChangeText: (e) => setAmount(thousandSeperator(e)),
          maxLength: 13,
        }}
      />

      <InputDropdown
        {...{
          title: "Category",
          value: category.name,
          onChange: (item) => setCategory({ name: item.categoryName, image: item.categoryImage }),
          icon: () => categories[category.image],
        }}
      />

      <InputDate {...{ date, setDate }} />

      <InputText
        {...{
          title: "Notes",
          keyboardType: "default",
          value: notes,
          onChangeText: setNotes,
          maxLength: 30,
        }}
      />

      <AddEditButton
        {...{
          editMode,
          editMsg: "Edit Spending",
          AddMsg: "Add Spending",
          onPress: handleSubmit,
        }}
      />
    </ScrollView>
  );
};

export default SpendingInfo;
