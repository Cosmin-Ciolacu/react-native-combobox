import React from "react";
import { ImageStyle, Image } from "react-native";

export default function DownIcon({
  color = "black",
  size = 24,
  style,
}: {
  color?: string;
  size?: number;
  style?: ImageStyle;
}) {
  return (
    <Image
      source={require("../../assets/images/down.png")}
      style={[
        {
          width: size,
          height: size,
          tintColor: color,
        },
        style,
      ]}
    />
  );
}
