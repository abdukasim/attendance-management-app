import React, { useRef, useState } from "react";
import { Box } from "../../../components/box";
import { Img } from "../../../components/image";
import { Text } from "../../../components/text";
import * as yup from "yup";
import { Field, Formik } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../../navigation/types";
import { login } from "../../../services/auth";
import LoginInput from "../../../components/form/inputs";
import { View } from "react-native";
import Checkbox from "../../../components/form/checkbox";
import { Button } from "../../../components/button";

type LoginScreenProps = NativeStackScreenProps<MainStackParamList, "Login">;

const LoginValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [hidPassword, setHidPassword] = useState(true);

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  return (
    <Box mr={48} ml={48} style={{ flex: 1, justifyContent: "center" }}>
      <Img
        resizeMode="contain"
        source={require("../../../../assets/images/logoBlue.png")}
        width={170}
        height={90}
      />
      <Text
        variant="title"
        color="primary"
        mt={90}
        style={{ textAlign: "center" }}
      >
        LogIn
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          login(values, navigation);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <View style={{ marginTop: 64 }}>
              <Field
                component={LoginInput}
                label="Username"
                name="username"
                placeholder="Abc124@example.com"
                autoFocus={true}
                onSubmitEditing={() => {
                  passwordRef.current && passwordRef.current.focus();
                }}
                blurOnSubmit={false}
              />
              <Field
                innerRef={(el: any) => (passwordRef.current = el)}
                component={LoginInput}
                label="Password"
                name="password"
                placeholder="•••••••••"
                type="password"
                secureTextEntry={hidPassword}
                setHidePassword={setHidPassword}
                onSubmitEditing={() => handleSubmit()}
              />
            </View>

            <Checkbox />

            <Button
              label="Sign in"
              textColor="background"
              bgColor="primary"
              mt={50}
              onPress={() => handleSubmit()}
            />
          </>
        )}
      </Formik>
    </Box>
  );
}
