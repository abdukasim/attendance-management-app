import React, { useState } from "react";

//components
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "../../text";
import { StyleProp, TextInput, TouchableOpacity, View } from "react-native";

//styles
import { styles } from "./styles";

//libs
import { FieldInputProps, FormikErrors, FormikProps } from "formik";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  placeholder: string;
  type?: string;
  innerRef?: React.MutableRefObject<null>;
  field: FieldInputProps<string>;
  form: FormikProps<any>;
  style?: any;
  hidePassword?: any;
  setHidePassword?: any;
}

export default function Input({
  label,
  placeholder,
  type,
  innerRef,
  field: { name, onBlur, onChange, value },
  form: { errors, touched, setFieldTouched },
  style,
  hidePassword,
  setHidePassword,
  ...props
}: InputProps) {
  const hasError: boolean | any = errors[name] && touched[name];

  return (
    <View style={[styles.container, hasError && { marginBottom: 12 }]}>
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
      {hasError && (
        <Text color="failure" variant="body" ml={10}>
          {errors[name] as string}
        </Text>
      )}
      {type === "password" && (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => setHidePassword(!hidePassword)}
        >
          <FontAwesome size={25} color="#e6e6e6" name="eye-slash" />
        </TouchableOpacity>
      )}
    </View>
  );
}
