import React, { useState } from "react";

//components
import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { Button } from "../../../components/button";
import { ImageUploader } from "../../../components/imageUploader";
import Input from "../../../components/form/inputs";
import { Text } from "../../../components/text";
import { CustomRadioButton } from "../../../components/form/radio-button";
import KeyboardAvoidingWrapper from "../../../components/keyboard-avoiding-wrapper";

//styles
import { styles } from "./styles";
import { theme } from "../../../styles/theme";

//libs
import { Field, FieldArray, Formik } from "formik";
import DropDownPicker from "react-native-dropdown-picker";

//services
import { registration } from "../../../services/registration-services";

//schema
import { OldMemberRegistrationValidationSchema } from "../../../helpers/validationSchemas";

export default function OldMemeberRegistration() {
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const [shelterStatusOptions, setShelterStatusOptions] = useState([
    { label: "Rent", value: "rent" },
    { label: "Private", value: "private" },
    { label: "Dependent", value: "dependent" },
    { label: "Homeless", value: "homeless" },
  ]);
  const [openSheter, setOpenShelter] = useState(false);
  const [shelterValue, setShelterValue] = useState(null);

  const [maritalStatusOptions, setMaritalStatusOptions] = useState([
    { label: "Married", value: "married" },
    { label: "Divorced", value: "divorced" },
    { label: "Widowed", value: "widowed" },
    { label: "Abandoned", value: "abandoned" },
  ]);
  const [openMarital, setOpenMarital] = useState(false);
  const [maritalValue, setMaritalValue] = useState(null);

  const [sexOptions, setSexOptions] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [openSex, setOpenSex] = useState(false);
  const [sexValue, setSexValue] = useState(null);

  const [radioButton, setRadioButton] = useState(-1);

  const radio_props = [
    { label: "Yes", value: 0 },
    { label: "No", value: 1 },
  ];

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{
            image: "",
            name: "",
            address: "",
            sex: "",
            phone: "",
            age: "",
            maritalStatus: "",
            children: [{ name: "", age: "", schooling: "" }],
            jobStatus: "",
            shelterStatus: "",
            rentAmount: 0,
            remark: "",
          }}
          validationSchema={OldMemberRegistrationValidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const oldRegStatus = await registration.old(
              values,
              setSubmitting,
              setMessage
            );
            if (oldRegStatus) {
              setMaritalValue(null);
              setShelterValue(null);
              setSexValue(null);
              resetForm();
            }
          }}
        >
          {({
            handleSubmit,
            handleBlur,
            isSubmitting,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
          }) => (
            <>
              <ImageUploader
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
              <Field
                component={Input}
                name="name"
                placeholder="Name"
                placeholderTextColor={theme.colors.foreground}
                // blurOnSubmit={false}
                style={styles.input}
              />
              <Field
                component={Input}
                name="age"
                placeholder="Age"
                placeholderTextColor={theme.colors.foreground}
                // blurOnSubmit={false}
                style={styles.input}
                keyboardType="numeric"
              />
              <DropDownPicker
                listMode="SCROLLVIEW"
                zIndex={1000}
                zIndexInverse={1000}
                placeholder="Sex"
                open={openSex}
                value={sexValue}
                items={sexOptions}
                setOpen={setOpenSex}
                setValue={setSexValue}
                setItems={setSexOptions}
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
              <Field
                component={Input}
                name="address"
                placeholder="Address"
                placeholderTextColor={theme.colors.foreground}
                // blurOnSubmit={false}
                style={styles.input}
              />
              <Field
                component={Input}
                name="phone"
                placeholder="Phone"
                placeholderTextColor={theme.colors.foreground}
                // blurOnSubmit={false}
                style={styles.input}
                keyboardType="numeric"
              />
              <DropDownPicker
                listMode="SCROLLVIEW"
                zIndex={2000}
                zIndexInverse={2000}
                placeholder="Shelter Status"
                open={openSheter}
                value={shelterValue}
                items={shelterStatusOptions}
                setOpen={setOpenShelter}
                setValue={setShelterValue}
                setItems={setShelterStatusOptions}
                onChangeValue={(value) => {
                  setFieldTouched("shelterStatus", true);
                  setFieldValue("shelterStatus", value);
                }}
                style={[
                  styles.input,
                  errors.shelterStatus && touched.shelterStatus
                    ? styles.errorInput
                    : null,
                ]}
              />
              {errors.shelterStatus && touched.shelterStatus && (
                <Text color="failure" variant="body" ml={10} mb={12}>
                  {errors.shelterStatus}
                </Text>
              )}

              {shelterValue === "rent" && (
                <Field
                  component={Input}
                  name="rentAmount"
                  placeholder="Rent Amount"
                  placeholderTextColor={theme.colors.foreground}
                  style={styles.input}
                  keyboardType="numeric"
                />
              )}

              <DropDownPicker
                listMode="SCROLLVIEW"
                zIndex={3000}
                zIndexInverse={3000}
                placeholder="Marital Status"
                open={openMarital}
                value={maritalValue}
                items={maritalStatusOptions}
                setOpen={setOpenMarital}
                setValue={setMaritalValue}
                setItems={setMaritalStatusOptions}
                onChangeValue={(value) => {
                  setFieldTouched("maritalStatus", true);
                  setFieldValue("maritalStatus", value);
                }}
                style={[
                  styles.input,
                  errors.maritalStatus && touched.maritalStatus
                    ? styles.errorInput
                    : null,
                ]}
              />
              {errors.maritalStatus && touched.maritalStatus && (
                <Text color="failure" variant="body" ml={10} mb={12}>
                  {errors.maritalStatus}
                </Text>
              )}
              <CustomRadioButton
                radioButton={radioButton}
                setRadioButton={setRadioButton}
                radio_props={radio_props}
              />
              {radioButton == 0 && (
                <FieldArray name="children">
                  {({ insert, remove, push }) => (
                    <View>
                      {values.children?.length > 0 &&
                        values.children.map((child, index) => (
                          <View key={index}>
                            <Field
                              component={Input}
                              name={`children[${index}].name`}
                              icon="child"
                              placeholder="Child Name"
                              style={styles.input}
                              placeholderTextColor={theme.colors.foreground}
                            />
                            <Field
                              component={Input}
                              name={`children[${index}].age`}
                              icon="child"
                              placeholder="Child Age"
                              style={styles.input}
                              placeholderTextColor={theme.colors.foreground}
                              keyboardType="numeric"
                            />
                            <Field
                              component={Input}
                              name={`children[${index}].schooling`}
                              icon="child"
                              placeholder="Child Schooling"
                              style={styles.input}
                              placeholderTextColor={theme.colors.foreground}
                            />
                            <View style={styles.childrenBtnContainer}>
                              <Button
                                borderRadius={100}
                                bgColor="primary"
                                textColor="secondary"
                                width={29}
                                height={29}
                                style={styles.childrenBtn}
                                onPress={() => remove(index)}
                              >
                                <Text color="background">-</Text>
                              </Button>
                              <Button
                                borderRadius={100}
                                bgColor="primary"
                                textColor="secondary"
                                width={29}
                                height={29}
                                style={styles.childrenBtn}
                                onPress={() =>
                                  push({ name: "", age: "", schooling: "" })
                                }
                              >
                                <Text color="background">+</Text>
                              </Button>
                            </View>
                          </View>
                        ))}
                    </View>
                  )}
                </FieldArray>
              )}
              <Field
                component={Input}
                name="jobStatus"
                placeholder="Job Type"
                placeholderTextColor={theme.colors.foreground}
                blurOnSubmit={false}
                style={styles.input}
              />
              {!isSubmitting && (
                <Button
                  label="Register"
                  textColor="background"
                  bgColor="primary"
                  mt={50}
                  pv={12}
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
                  mt={50}
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
