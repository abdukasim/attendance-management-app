import React, { useState } from "react";

//components
import { SafeAreaView, ActivityIndicator } from "react-native";
import KeyboardAvoidingWrapper from "../../../components/keyboard-avoiding-wrapper";
import Input from "../../../components/form/inputs";
import { Text } from "../../../components/text";
import { Button } from "../../../components/button";

//styles
import { styles } from "../old-member/styles";
import { theme } from "../../../styles/theme";

//libs
import { Field, Formik } from "formik";
import DropDownPicker from "react-native-dropdown-picker";

//services
import { registration } from "../../../services/registration-services";

//types
import { CreatePendingUserRequest } from "../../../models/pending-models";

//helpers
import { NewMemberRegistrationValidationSchema } from "../../../helpers/validationSchemas";

export default function NewMemberRegistration() {
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const [dropdownOptions, setDropdownOptions] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);

  const initialValues: CreatePendingUserRequest = {
    name: "",
    phone: "",
    address: "",
    sex: "female",
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={NewMemberRegistrationValidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const newRegStatus = await registration.new(
              values,
              setSubmitting,
              setMessage
            );
            newRegStatus && resetForm();
          }}
        >
          {({
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            errors,
            touched,
          }) => (
            <>
              <Field
                component={Input}
                name="name"
                placeholder="Name"
                placeholderTextColor={theme.colors.foreground}
                style={styles.input}
              />
              <Field
                component={Input}
                name="phone"
                placeholder="Phone"
                placeholderTextColor={theme.colors.foreground}
                style={styles.input}
                keyboardType="numeric"
              />
              <Field
                component={Input}
                name="address"
                placeholder="Address"
                placeholderTextColor={theme.colors.foreground}
                style={styles.input}
              />
              <DropDownPicker
                listMode="SCROLLVIEW"
                zIndex={3000}
                zIndexInverse={1000}
                placeholder="Sex"
                open={openDropdown}
                value={dropdownValue}
                items={dropdownOptions}
                setOpen={setOpenDropdown}
                setValue={setDropdownValue}
                setItems={setDropdownOptions}
                onChangeValue={(value) => {
                  setFieldTouched("sex", true);
                  setFieldValue("sex", value);
                }}
                style={[
                  styles.input,
                  errors.sex && touched.sex ? styles.errorInput : null,
                ]}
              />
              {errors.sex && touched.sex && (
                <Text color="failure" variant="body" ml={10} mb={12}>
                  {errors.sex}
                </Text>
              )}

              {!isSubmitting && (
                <Button
                  label="Register"
                  textColor="background"
                  bgColor="primary"
                  mt={35}
                  pv={12}
                  height={60}
                  borderRadius={30}
                  style={{ width: "100%" }}
                  onPress={() => handleSubmit()}
                />
              )}
              {isSubmitting && (
                <Button
                  borderRadius={30}
                  pv={12}
                  textColor="background"
                  bgColor="primary"
                  mt={35}
                  height={60}
                >
                  <ActivityIndicator size="small" color="white" />
                </Button>
              )}
              <Text
                variant="headerSm"
                color={message.type === "ERROR" ? "failure" : "success"}
                style={{
                  textAlign: "center",
                }}
                mt={10}
              >
                {message.text}
              </Text>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}
