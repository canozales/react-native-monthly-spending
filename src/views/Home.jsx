import Card from "../components/Card";
import SpendingList from "../components/List/SpendingList";

import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, ScrollView, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Calendar, Options } from "../../assets/svgs";

import { getItem } from "../services/asyncstorage";
import { getItemsByMonth } from "../services/db";
import { filterOnlyDigits } from "../utils/number";
import { formatDateStringToMonthYear } from "../utils/datetime";
import { getMonthYearAndFirstLastDates } from "../utils/datetime";

const Home = ({ navigation }) => {
  const [year_month, firstDate, lastDate] = getMonthYearAndFirstLastDates();
  const [spendingList, setSpendingList] = useState([]);
  const [allocation, setAllocation] = useState("0");

  const expense = spendingList.reduce((total, item) => total + parseInt(filterOnlyDigits(item.amount)), 0).toString();
  const leftToSpend = parseInt(allocation) - parseInt(expense);

  useFocusEffect(
    useCallback(() => {
      const getAllocAndLoadSpending = async () => {
        try {
          const alloc = await getItem("allocation");
          if (alloc) setAllocation(alloc);

          const items = await getItemsByMonth(year_month);
          setSpendingList(items);
        } catch {
          console.log("Something Wrong");
        }
      };
      getAllocAndLoadSpending();
    }, [])
  );

  return (
    <ScrollView className="bg-white px-4">
      <View className="flex flex-row justify-between items-center w-full mt-5 relative">
        <View className="flex flex-row">
          <Calendar />

          <View className="flex ml-2">
            <Text className="text-prm font-bold">{formatDateStringToMonthYear(year_month)}</Text>
            <Text className="text-prm">{`${firstDate} - ${lastDate}`}</Text>
          </View>
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate("Configurations", {
              allocation: allocation,
            })
          }
          className="flex flex-row items-center bg-[#F6F6FE] px-4 py-1 rounded-full"
        >
          <Options />
          <MaterialCommunityIcons name="dots-vertical" size={30} color="#6965A8" />
        </Pressable>
      </View>

      <Card
        title1="Left to Spend"
        title2="Expense"
        title3="Allocation"
        num1={leftToSpend}
        num2={expense}
        num3={allocation}
      />

      {spendingList.length > 0
        ? spendingList.map((value, index) => (
            <SpendingList
              key={index}
              data={value}
              command={() =>
                navigation.navigate("SpendingInfo", {
                  data: value,
                  status: "edit",
                })
              }
            />
          ))
        : null}
    </ScrollView>
  );
};

export default Home;
