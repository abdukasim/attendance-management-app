import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";

function ReportIcon(props) {
  return (
    <Svg
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={18}
        height={19}
      >
        <Path fill="#C4C4C4" d="M0 0H18V19H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M17.564.778v17.146a1.225 1.225 0 01-2.45 0V.778a1.225 1.225 0 012.45 0M11.44 4.452c.676 0 1.225.549 1.225 1.225v12.247a1.225 1.225 0 01-2.45 0V5.677c0-.676.549-1.225 1.225-1.225m-4.899 4.9c.676 0 1.225.548 1.225 1.224v7.348a1.225 1.225 0 01-2.45 0v-7.348c0-.676.55-1.225 1.225-1.225M1.642 14.25c.676 0 1.225.549 1.225 1.225v2.45a1.225 1.225 0 01-2.45 0v-2.45c0-.676.55-1.225 1.225-1.225z"
          fillRule="evenodd"
          fill={props.color}
        />
      </G>
    </Svg>
  );
}

export default ReportIcon;
