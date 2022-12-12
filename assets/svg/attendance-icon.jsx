import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";

export function AttendanceIcon(props) {
  return (
    <Svg
      width={25}
      height={23}
      viewBox="0 0 25 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={25}
        height={23}
      >
        <Path fill="#C4C4C4" d="M0 0H25V23H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M22.837 11.351c0 5.411-4.387 9.798-9.798 9.798-5.41 0-9.798-4.387-9.798-9.798 0-5.41 4.387-9.798 9.798-9.798 5.411 0 9.798 4.387 9.798 9.798m-9.724 3.132c-.346.349-.809.542-1.298.542-.493 0-.953-.193-1.3-.542l-2.016-2.245a1.246 1.246 0 010-1.749 1.215 1.215 0 011.732 0l1.584 1.808 4.034-4.257a1.214 1.214 0 011.731 0 1.246 1.246 0 010 1.748l-4.467 4.695z"
          fillRule="evenodd"
          fill={props.color}
        />
      </G>
    </Svg>
  );
}
