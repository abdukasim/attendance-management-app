import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";

function PendingIcon(props) {
  return (
    <Svg
      width={20}
      height={19}
      viewBox="0 0 20 19"
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
        height={19}
      >
        <Path fill="#C4C4C4" d="M0 0H20V19H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M4.537 8.351H15.56a4.286 4.286 0 000-8.573H4.537a4.287 4.287 0 000 8.573m9.185-4.287a1.838 1.838 0 113.676.002 1.838 1.838 0 01-3.676-.002M15.56 10.8H4.537a4.286 4.286 0 000 8.573H15.56a4.286 4.286 0 100-8.573m-9.186 4.287a1.838 1.838 0 11-3.675-.002 1.838 1.838 0 013.675.002z"
          fillRule="evenodd"
          fill={props.color}
        />
      </G>
    </Svg>
  );
}

export default PendingIcon;
