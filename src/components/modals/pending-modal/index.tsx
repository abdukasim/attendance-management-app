import React, { useState } from "react";

//components
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Card } from "../../card";
import { Text } from "../../text";
import { Button } from "../../button";
import { ImageUploader } from "../../imageUploader";
import Input from "../../form/inputs";
import { AudioRecorder } from "../../audio-recorder";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomRadioButton } from "../../form/radio-button";
import Modal from "react-native-modal";

//styles
import { styles } from "./styles";

//hooks
import { useModalStore } from "../../../store/modal-store";
import { theme } from "../../../styles/theme";

//libs
import { Field, Formik, FieldArray } from "formik";
import * as yup from "yup";

//services
import { handlePendingListForm } from "../../../services/pending";

const PendingListValidationSchema = yup.object().shape({
  age: yup
    .number()
    .required("Age is required")
    .typeError("Please enter a number"),
  shelterStatus: yup.string().required("Shelter Status is required"),
  jobStatus: yup.string().required("Job Status is required"),
  maritalStatus: yup.string().required("Marital Status is required"),
});

export default function PendingModal() {
  const modaleStore = useModalStore((state) => state.pending);

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

  const [radioButton, setRadioButton] = useState(-1);

  const radio_props = [
    { label: "Yes", value: 0 },
    { label: "No", value: 1 },
  ];

  return (
    <Modal
      isVisible={modaleStore.isShow}
      backdropOpacity={0.7}
      onBackdropPress={modaleStore.hide}
      onBackButtonPress={modaleStore.hide}
      propagateSwipe
      style={{ margin: 0 }}
    >
      <ScrollView>
        <Card
          style={styles.card}
          bgColor="background"
          width={357}
          // height={241}
          borderRadius={24}
          py={20}
          px={24}
        >
          <Formik
            initialValues={{
              id: modaleStore.pendingData.id,
              image: "",
              recording: "",
              age: "",
              maritalStatus: "",
              children: [{ name: "", age: "", schooling: "" }],
              jobStatus: "",
              shelterStatus: "",
              rent: "",
              remark: "",
            }}
            validationSchema={PendingListValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handlePendingListForm(values, setSubmitting, setMessage);
              setTimeout(() => {
                modaleStore.hide();
                setMessage({
                  text: "",
                  type: "",
                });
              }, 2000);
              // console.log(values);
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
                <AudioRecorder
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
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
                  zIndex={3000}
                  zIndexInverse={1000}
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
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  zIndex={2000}
                  zIndexInverse={2000}
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

                <Field
                  component={Input}
                  name="remark"
                  placeholder="Remark"
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
                    style={{ width: "100%" }}
                  >
                    <ActivityIndicator size="large" color="white" />
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
        </Card>
      </ScrollView>
    </Modal>
  );
}
