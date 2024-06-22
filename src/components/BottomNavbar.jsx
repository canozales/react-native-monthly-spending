import { View, Pressable } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { AntDesign, SimpleLineIcons, Ionicons } from "@expo/vector-icons";

const BottomNavbar = () => {
  const navigation = useNavigation();
  const currentRoute = useNavigationState((state) => state?.routes[state.index].name);

  const [hideNavbar, setHideNavbar] = useState(false);

  const hideList = ["SpendingInfo", "CategoryInfo", "HistoryInfo", "Loading", "Configurations"];
  const navbarlists = [
    {
      path: "Home",
      data: {},
      icon: <SimpleLineIcons name="screen-desktop" size={27} color={currentRoute === "Home" ? "#D8BFD8" : "#E6E6FA"} />,
    },
    {
      path: "SpendingInfo",
      data: { status: "add" },
      icon: <AntDesign name="pluscircleo" size={27} color="#E6E6FA" />,
    },
    {
      path: "History",
      data: {},
      icon: (
        <Ionicons name="calendar-clear-outline" size={29} color={currentRoute === "History" ? "#D8BFD8" : "#E6E6FA"} />
      ),
    },
    {
      path: "Category",
      data: {},
      icon: <AntDesign name="menufold" size={27} color={currentRoute === "Category" ? "#D8BFD8" : "#E6E6FA"} />,
    },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      setHideNavbar(hideList.includes(navigation.getCurrentRoute().name));
    });

    return unsubscribe;
  }, [navigation]);

  if (hideNavbar) return null;

  return (
    <View className="bg-prm px-6 flex flex-row items-center justify-between">
      {navbarlists.map((value, index) => (
        <Pressable className="py-4 px-5" key={index} onPress={() => navigation.navigate(value.path, value.data)}>
          {value.icon}
        </Pressable>
      ))}
    </View>
  );
};

export default BottomNavbar;
