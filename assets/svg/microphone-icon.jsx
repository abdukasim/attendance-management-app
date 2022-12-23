import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";

export function Microphone(props) {
  return (
    <Svg
      width={15}
      height={17}
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={15}
        height={17}
      >
        <Path fill="#FFF38D" d="M0 0H15V17H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M5.625 10.506c.525.528 1.239.825 1.984.825a2.811 2.811 0 002.804-2.813V3.85a2.805 2.805 0 10-5.608 0v4.668c-.003.745.293 1.46.82 1.988m2.919 4.56V14.06a5.615 5.615 0 004.674-5.537.935.935 0 10-1.87 0 3.74 3.74 0 01-3.74 3.743A3.741 3.741 0 013.87 8.523a.935.935 0 10-1.87 0 5.615 5.615 0 004.674 5.537v1.005a.935.935 0 101.87 0z"
          fillRule="evenodd"
          fill="#FFF38D"
        />
      </G>
    </Svg>
  );
}
