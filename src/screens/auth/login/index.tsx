import React, { useRef, useState } from "react";
import { Box } from "../../../components/box";
import { Img } from "../../../components/image";
import { Text } from "../../../components/text";
import * as yup from "yup";
import { Field, Formik } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../../navigation/types";
import Input from "../../../components/form/inputs";
import { ActivityIndicator, View } from "react-native";
import Checkbox from "../../../components/form/checkbox";
import { Button } from "../../../components/button";
import { styles } from "./styles";
import KeyboardAvoidingWrapper from "../../../components/keyboard-avoiding-wrapper";
import { auth } from "../../../services/auth-service";

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
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  return (
    <KeyboardAvoidingWrapper>
      <Box mr={48} ml={48} mt={110} style={{ height: "100%" }}>
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
            auth.login(values, navigation, setErrorMessage, setSubmitting);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <>
              <View style={{ marginTop: 64 }}>
                <Field
                  component={Input}
                  label="Username"
                  name="username"
                  placeholder="Abc124@example.com"
                  autoFocus={true}
                  onSubmitEditing={() => {
                    passwordRef.current && passwordRef.current.focus();
                  }}
                  blurOnSubmit={false}
                  style={styles.input}
                />
                <Field
                  innerRef={(el: any) => (passwordRef.current = el)}
                  component={Input}
                  label="Password"
                  name="password"
                  placeholder="•••••••••"
                  type="password"
                  secureTextEntry={hidePassword}
                  setHidePassword={setHidePassword}
                  onSubmitEditing={() => handleSubmit()}
                  style={styles.input}
                />
              </View>
              <Checkbox />
              {!isSubmitting && (
                <Button
                  borderRadius={30}
                  pv={12}
                  label="Sign in"
                  textColor="background"
                  bgColor="primary"
                  mt={50}
                  height={60}
                  onPress={() => handleSubmit()}
                />
              )}
              {isSubmitting && (
                <Button
                  borderRadius={30}
                  pv={12}
                  textColor="background"
                  bgColor="primary"
                  mt={50}
                  height={60}
                >
                  <ActivityIndicator size="small" color="white" />
                </Button>
              )}
              <Text
                variant="headerSm"
                color="failure"
                style={{
                  textAlign: "center",
                }}
                mt={10}
              >
                {errorMessage}
              </Text>
            </>
          )}
        </Formik>
      </Box>
    </KeyboardAvoidingWrapper>
  );
}
