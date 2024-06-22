import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { getSavedCategories } from "../../services/db";

const renderItem = (item) => {
  return (
    <View className="flex flex-row items-center justify-between p-3">
      <Text className="text-prm text-[15px] font-medium">{item.categoryName}</Text>
    </View>
  );
};

const InputDropdown = ({ value, title, onChange, icon }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const result = await getSavedCategories();
        setData(result);
      } catch {
        console.log("Something Wrong");
      }
    };
    loadItems();
  }, []);

  return (
    <>
      <Text className="text-prm font-bold m-5 mb-2">{title}</Text>
      <Dropdown
        className="bg-sec border-prm text-prm border-[1.5px] py-2 px-3 mx-5 rounded-[7px]"
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        maxHeight={400} // scroll on max
        activeColor="#f6f6fe"
        data={data}
        search={false}
        // itemContainerStyle={styles.itemContainerStyle}
        // iconStyle={styles.iconStyle}
        // labelField="label"
        // valueField="value"
        placeholder={value}
        value={value}
        onChange={onChange}
        renderRightIcon={icon}
        renderItem={renderItem}
      />
    </>
  );
};

export default InputDropdown;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 7,
    // borderRadius: 7,
    // paddingVertical: 5,
  },

  placeholderStyle: {
    fontSize: 15,
    color: "#6965A8",
  },
});
