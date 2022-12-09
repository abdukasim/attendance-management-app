import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";

function StarIcon(props) {
  return (
    <Svg
      width={19.598877}
      height={18.375488}
      viewBox="0 0 19.5989 18.3755"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={19.598877}
        height={18.375488}
      >
        <Path fill="#C4C4C4" d="M0 0H19.598957V18.375477H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M3.78 18.143a1.263 1.263 0 001.412.03l4.612-2.939 4.612 2.94c.435.274.992.26 1.409-.037.415-.294.602-.817.47-1.307l-1.427-5.195 4.268-3.38c.402-.314.561-.844.402-1.327a1.244 1.244 0 00-1.12-.845l-5.491-.278L10.959.784A1.256 1.256 0 008.632.783l-1.96 5.021-5.493.278a1.24 1.24 0 00-1.118.845 1.2 1.2 0 00.405 1.327l4.27 3.384-1.425 5.197a1.215 1.215 0 00.469 1.308z"
          fillRule="evenodd"
          fill={props.color}
        />
      </G>
    </Svg>
  );
}

export default StarIcon;
