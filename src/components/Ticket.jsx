import React from "react";
import TicketList from "./List/TicketList";
import { Text, View, Pressable, Image } from "react-native";

const Ticket = ({ spendingPercentage = [] }) => {
  return (
    <View className="bg-sec flex m-5 rounded-lg">
      <View className="p-2">
        {spendingPercentage.map((value, index) => (
          <TicketList
            key={index}
            {...{
              index,
              categoryName: value.categoryName,
              percentage: value.percentage,
              amount: value.amount,
            }}
          />
        ))}
      </View>

      <View className="w-full h-[50px] relative flex flex-row justify-center items-center">
        <View className="bg-white h-[50px] w-[50px] rounded-full absolute -left-[30px] z-10" />
        <View className="bg-white h-[50px] w-[50px] rounded-full absolute -right-[30px] z-10" />
        <View className="border-black border-b-[1px] border-dashed h-[1px] w-[82%]" />
      </View>

      <View className="p-3">
        <Pressable onPress={() => {}}>
          <Image className="w-full h-[45px]" source={require("../../assets/barcode.png")} />
          <Text className="text-center mt-2">Swipe left to see the details</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Ticket;
