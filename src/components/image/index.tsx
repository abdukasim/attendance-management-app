import React from "react";
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  _Image,
} from "react-native";

interface ImgProps extends React.ComponentProps<typeof _Image> {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
  resizeMode?: ImageResizeMode;
}

export const Img: React.FC<ImgProps> = ({
  source,
  width,
  height,
  resizeMode,
}) => {
  return (
    <Image
      source={source}
      style={{
        width: width,
        height: height,
      }}
      resizeMode={resizeMode}
    />
  );
};
