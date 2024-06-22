import { useState } from "react";
import { Text, Pressable } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

const InputDate = ({ date, setDate }) => {
  const today = new Date();

  const [show, setShow] = useState(false);

  const isToday = (theDate) => {
    return (
      theDate.getFullYear() === today.getFullYear() &&
      theDate.getMonth() === today.getMonth() &&
      theDate.getDate() === today.getDate()
    );
  };

  const onChange = (_, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
  };

  return (
    <>
      <Text className="text-prm font-bold m-5 mb-2">Date</Text>
      <Pressable
        className="bg-sec border-prm  border-[1.5px] py-3 px-3 mx-5 rounded-[7px]"
        onPress={() => setShow(true)}
      >
        <Text className="text-prm">{`${date.toDateString()} ${isToday(date) ? "(Today)" : ""}`}</Text>
      </Pressable>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          display="spinner"
        />
      )}
    </>
  );
};

export default InputDate;
