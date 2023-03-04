import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./styles";
import { Img } from "../image";

interface ImageUploaderProps {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => void;
  setFieldError: (field: string, message: string | undefined) => void;
  imageUri?: string; // TODO allow changing image in benefeciaries screen
  editable: boolean;
  error?: any;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  setFieldTouched,
  setFieldValue,
  setFieldError,
  imageUri,
  editable,
  error,
}) => {
  const [image, setImage] = useState(imageUri);

  const pickImage = async () => {
    setFieldTouched("image", true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageSizeInMB = result.assets[0]?.fileSize
        ? result.assets[0].fileSize / 1024 / 1024
        : 0;

      if (imageSizeInMB > 5) {
        setFieldError("image", "The selected image is too large");
      } else {
        setImage(result.assets[0].uri);
        setFieldValue("image", result.assets[0].uri);
      }
    }
  };

  return (
    <View style={error ? styles.imageContainerError : styles.imageContainer}>
      {image && <Img source={{ uri: image }} width="100%" height="100%" />}
      {editable && (
        <View style={styles.uploadBtnContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.uploadBtn}>
            <FontAwesome name="camera" size={20} color="black" />
            <Text style={{ marginLeft: 6 }}>
              {image ? "Edit" : "Upload"} Image
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
