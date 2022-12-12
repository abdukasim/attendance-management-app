import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";

export function PresentIcon(props) {
  return (
    <Svg
      width={19}
      height={13}
      viewBox="0 0 19 13"
      fill={props.color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={19}
        height={13}
      >
        <Path fill="#0B77C2" d="M0 0H19V13H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M5.273 12.928h7.466a6.212 6.212 0 006.208-6.213A6.211 6.211 0 0012.739.502H5.272A6.212 6.212 0 00-.936 6.715a6.211 6.211 0 006.209 6.213m4.975-6.213a2.483 2.483 0 114.967 0 2.483 2.483 0 11-4.967 0z"
          fillRule="evenodd"
          fill={props.color}
        />
      </G>
    </Svg>
  );
}
