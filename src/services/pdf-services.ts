import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export const createAndSavePDF = async (html: string) => {
  try {
    const { uri } = await Print.printToFileAsync({
      html: html,
      base64: false,
    });
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error(error);
  }
};
