import { ToastProvider } from "react-native-toast-notifications";
import { StatusBar, View, Text } from "react-native";

import Navigator from "./Navigator";
import BottomNavbar from "./src/components/BottomNavbar";

export default function App() {
  return (
    <ToastProvider
      placement="bottom"
      duration={1500}
      renderType={{
        normal: (toast) => (
          <View className="bg-sec border-[2px] border-prm mb-[70px] py-3 px-7 rounded-lg relative">
            <Text className="text-prm font-medium">{toast.message}</Text>
          </View>
        ),
      }}
    >
      <Navigator>
        <BottomNavbar />
        <StatusBar style="auto" backgroundColor="#6965A8" />
      </Navigator>
    </ToastProvider>
  );
}
