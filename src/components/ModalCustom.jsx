import Modal from "react-native-modal";

import { View, Text } from "react-native";
import { BackgroundButton, OutlineButton } from "./Button/Button";

const ModalCustom = ({ title, message, isModalVisible, onYes, onNo }) => {
  return (
    <Modal backdropTransitionOutTiming={0} animationIn={"fadeIn"} animationOut={"fadeOut"} isVisible={isModalVisible}>
      <View className="bg-white rounded-lg py-4">
        <Text className="text-prm text-[20px] font-semibold text-center">{title}</Text>
        <Text className="text-prm text-[16px] mt-1 font-semibold text-center">{message}</Text>

        <BackgroundButton customClass="mt-8" onPress={onYes} title="Yes" />
        <OutlineButton customClass="mt-3" onPress={onNo} title="No" />
      </View>
    </Modal>
  );
};

export default ModalCustom;
