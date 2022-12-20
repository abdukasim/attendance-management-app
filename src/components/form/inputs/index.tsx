import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FieldInputProps, FormikProps } from "formik";
import { Text } from "../../text";
import { styles } from "./styles";
import { StyleProp, TextInput, TouchableOpacity, View } from "react-native";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  placeholder: string;
  type?: string;
  innerRef?: React.MutableRefObject<null>;
  field: FieldInputProps<string>;
  form: FormikProps<any>;
  style?: any;
}

export default function Input({
  label,
  placeholder,
  type,
  innerRef,
  field: { name, onBlur, onChange, value },
  form: { errors, touched, setFieldTouched },
  style,
  ...props
}: InputProps) {
  const hasError: boolean | any = errors.name && touched.name;

  return (
    <View style={{ position: "relative" }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        style={[style, hasError && styles.errorInput]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...props}
        ref={innerRef}
      />
      {type === "password" && (
        <TouchableOpacity style={styles.rightIcon}>
          <FontAwesome size={25} color="#e6e6e6" name="eye-slash" />
        </TouchableOpacity>
      )}
    </View>
  );
}
