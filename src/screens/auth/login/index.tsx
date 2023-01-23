import React, { useEffect, useRef, useState } from "react";

//components
import { Box } from "../../../components/box";
import { Img } from "../../../components/image";
import { Text } from "../../../components/text";
import Input from "../../../components/form/inputs";
import Checkbox from "../../../components/form/checkbox";
import KeyboardAvoidingWrapper from "../../../components/keyboard-avoiding-wrapper";
import { Button } from "../../../components/button";
import { ActivityIndicator, View } from "react-native";

//libs
import { Field, Formik } from "formik";

//types
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../../navigation/types";
import { LoginValidationSchema } from "../../../helpers/validationSchemas";

//styles
import { styles } from "./styles";

//services
import { auth } from "../../../services/auth-service";
import { useSessionStore } from "../../../store/session-store";

type LoginScreenProps = NativeStackScreenProps<MainStackParamList, "Login">;

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [hidePassword, setHidePassword] = useState(true);

  const [checked, setChecked] = useState(false);

  const sessionStore = useSessionStore((state) => state);

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  useEffect(() => {
    if (sessionStore.authUser !== null) {
      navigation.replace(sessionStore.authUser.type as any);
    }
  }, []);

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
          onSubmit={async (values, { setSubmitting }) => {
            await auth.login(
              values,
              navigation,
              setSubmitting,
              sessionStore.setAuthUser,
              checked
            );
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
                  hidePassword={hidePassword}
                  onSubmitEditing={() => handleSubmit()}
                  style={styles.input}
                />
              </View>
              <Checkbox checked={checked} setChecked={setChecked} />
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
            </>
          )}
        </Formik>
      </Box>
    </KeyboardAvoidingWrapper>
  );
}
