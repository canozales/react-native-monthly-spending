import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (name) => {
  try {
    return await AsyncStorage.getItem(name);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    throw e;
  }
};
