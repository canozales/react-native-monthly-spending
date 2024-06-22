import Card from "../components/Card";
import HistoryList from "../components/List/HistoryList";

import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { getSpendingGroupedByMonth } from "../services/db";
import { getAverageLowestHighest } from "../utils/number";
import { getMonthYearAndFirstLastDates } from "../utils/datetime";

const History = () => {
  const [history, setHistory] = useState([]);
  const [lowest, highest, average] = getAverageLowestHighest(history);
  const [year_month] = getMonthYearAndFirstLastDates();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await getSpendingGroupedByMonth();
        const finalResult = result.filter((x) => x.year_month !== year_month).reverse();

        setHistory(finalResult);
      } catch (error) {
        console.log("Error fetching spending history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <ScrollView className="bg-white px-4">
      <Card
        title1="Average Monthly Expenses"
        title2="Highest"
        title3="Lowest"
        num1={average}
        num2={highest}
        num3={lowest}
      />

      {history &&
        history.map((value, index) => (
          <HistoryList key={index} {...{ date: value.year_month, totalSpending: value.total_amount }} />
        ))}
    </ScrollView>
  );
};

export default History;
