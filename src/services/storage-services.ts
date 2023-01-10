import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginResponse } from "../models/session-models";

export default class storage {
  static async storeData(key: string, value: LoginResponse) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.error(e);
    }
  }

  static async getData(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.error(e);
    }
  }

  static async removeValue(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
      console.error(e);
    }
  }
}
