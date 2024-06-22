import Modal from "react-native-modal";
import Goback from "../components/Goback";
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

      <Modal backdropTransitionOutTiming={0} animationIn={"fadeIn"} animationOut={"fadeOut"} isVisible={isModalVisible}>
        <View className="bg-white rounded-lg py-4">
          <Text className="text-prm text-[20px] font-semibold text-center">Confirmation</Text>
          <Text className="text-prm text-[16px] mt-1 font-semibold text-center">Are you sure to clear all data ?</Text>

          <BackgroundButton customClass="mt-6" onPress={handleClearData} title="Yes" />
          <OutlineButton customClass="mt-3" onPress={toggleModal} title="No" />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Configurations;
