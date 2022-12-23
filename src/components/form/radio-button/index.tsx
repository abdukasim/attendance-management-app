import React from "react";
import { TextInput, View } from "react-native";
import { theme } from "../../../styles/theme";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { styles } from "../../modals/pending-modal/styles";

interface CustomRadioButtonProps {
  radioButton: number;
  setRadioButton: React.Dispatch<React.SetStateAction<number>>;
  radio_props: {
    label: string;
    value: number;
  }[];
}

export const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  radioButton,
  setRadioButton,
  radio_props,
}) => {
  return (
    <View>
      <TextInput
        placeholder="Children"
        placeholderTextColor={theme.colors.foreground}
        blurOnSubmit={false}
        style={styles.input}
        editable={false}
      />
      <RadioForm
        formHorizontal={true}
        animation={true}
        style={{ position: "absolute", top: 18, right: 25 }}
      >
        {/* To create radio buttons, loop through your array of options */}
        {radio_props.map((obj, i) => (
          <RadioButton
            labelHorizontal={true}
            key={i}
            style={{ alignItems: "center" }}
          >
            {/*  You can set RadioButtonLabel before RadioButtonInput */}
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={radioButton === i}
              onPress={(value: any) => {
                setRadioButton(value);
              }}
              borderWidth={1}
              buttonInnerColor={theme.colors.foreground}
              buttonOuterColor={theme.colors.foreground}
              buttonSize={14}
              buttonOuterSize={14}
              // buttonStyle={{position: "absolute"}}
              buttonWrapStyle={{ marginLeft: 10 }}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={true}
              onPress={(value: any) => {
                setRadioButton(value);
              }}
              labelStyle={{
                fontSize: 14,
                color: theme.colors.foreground,
              }}
              labelWrapStyle={{}}
            />
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );
};
