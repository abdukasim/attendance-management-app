import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";

export function VisitedIcon(props) {
  return (
    <Svg
      width={20}
      height={17}
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={20}
        height={17}
      >
        <Path fill="#C4C4C4" d="M0 0H20V17H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M18.43 2.228H1.282a1.225 1.225 0 010-2.45H18.43a1.225 1.225 0 010 2.45m-1.224 3.674c0 .676-.549 1.224-1.225 1.224H1.283a1.225 1.225 0 010-2.449H15.98c.676 0 1.225.549 1.225 1.225m1.224 6.123H1.283a1.225 1.225 0 010-2.45H18.43a1.225 1.225 0 010 2.45M14.755 15.7c0 .675-.549 1.224-1.225 1.224H1.284a1.225 1.225 0 010-2.45h12.248c.675 0 1.224.55 1.224 1.226z"
          fillRule="evenodd"
          fill={props.color}
        />
      </G>
    </Svg>
  );
}
