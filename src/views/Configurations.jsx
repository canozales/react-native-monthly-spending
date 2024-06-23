import Goback from "../components/Goback";
import ModalCustom from "../components/ModalCustom";
import SectionTitle from "../components/SectionTitle";
import InputText from "../components/Input/InputText";

import { useToast } from "react-native-toast-notifications";
import { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";

import { setItem } from "../services/asyncstorage";
import { getItems, clearTable } from "../services/db";
import { exportCsv } from "../utils/file";
import { filterOnlyDigits, thousandSeperator } from "../utils/number";

import { BackgroundButton, OutlineButton } from "../components/Button/Button";

const Configurations = ({ route, navigation }) => {
  const toast = useToast();

  const { allocation } = route.params;

  const [csvData, setCsvData] = useState([]);
  const [money, setMoney] = useState(thousandSeperator(allocation));
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  useEffect(() => {
    const getAllDataFromDB = async () => {
      try {
        const items = await getItems();
        setCsvData(items);
      } catch {
        console.log("Something Wrong");
      }
    };
    getAllDataFromDB();
  }, []);

  const handleSetAlloc = async () => {
    if (money !== "") {
      setItem("allocation", filterOnlyDigits(money))
        .then(() => {
          toast.show("Allocation Has been Updated", { type: "normal" });
          navigation.goBack();
        })
        .catch(() => toast.show("Error on Set Allocation", { type: "normal" }));
    } else {
      toast.show("Allocation is Empty", { type: "normal" });
    }
  };

  const handleExportHistory = async () => {
    try {
      await exportCsv(csvData);
    } catch {
      console.log("Error on Exporting CSV");
    }
  };

  const handleClearData = async () => {
    try {
      await clearTable();
      await setItem("allocation", "0");
      toast.show("Database Has been Cleared", { type: "normal" });
      navigation.goBack();
    } catch {
      toast.show("Error on Clearing Data", { type: "normal" });
    }
  };

  return (
    <ScrollView className="bg-white relative">
      <Goback msg={"Back to Home"} />
      <SectionTitle msg={"Configurations"} />

      <InputText
        {...{
          title: "Allocation",
          keyboardType: "number-pad",
          value: money,
          onChangeText: (e) => setMoney(thousandSeperator(e)),
        }}
      />

      <BackgroundButton customClass="mt-4" onPress={handleSetAlloc} title="Set Allocation" />
      <OutlineButton customClass="mt-12" onPress={toggleModal} title="Clear Database" />
      <OutlineButton customClass="mt-4" onPress={handleExportHistory} title="Export Spending History" />

      <ModalCustom
        isModalVisible={isModalVisible}
        onYes={handleClearData}
        onNo={toggleModal}
        title={"Confirmation"}
        message={"Are you sure to clear all data ?"}
      />
    </ScrollView>
  );
};

export default Configurations;
