import Swiper from "react-native-swiper";
import Ticket from "../components/Ticket";
import HistoryDetail from "../components/List/HistoryDetail";
import Goback from "../components/Goback";
import SectionTitle from "../components/SectionTitle";

import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { getItemsByMonth } from "../services/db";
import { getSpendingPercentage } from "../utils/number";
import { formatDateStringToMonthYear, sortByDate } from "../utils/datetime";

const HistoryInfo = ({ route }) => {
  const { date } = route.params;
  const [historyList, setHistoryList] = useState([]);

  const spendingPercentage = getSpendingPercentage(historyList);

  useEffect(() => {
    const getHistoryList = async () => {
      const result = await getItemsByMonth(date);
      const sortedResult = sortByDate(result);
      setHistoryList(result);
    };

    getHistoryList();
  }, []);

  return (
    <ScrollView className="bg-white relative">
      <Goback msg={"Back"} />
      <SectionTitle msg={formatDateStringToMonthYear(date)} />

      <Swiper showsPagination={false} loop={true}>
        <Ticket spendingPercentage={spendingPercentage} />

        <View className="m-5">
          {historyList.map((value, index) => (
            <HistoryDetail
              key={index}
              {...{
                name: value.categoryName,
                date: value.date,
                notes: value.notes,
                amount: value.amount,
              }}
            />
          ))}
        </View>
      </Swiper>
    </ScrollView>
  );
};

export default HistoryInfo;
