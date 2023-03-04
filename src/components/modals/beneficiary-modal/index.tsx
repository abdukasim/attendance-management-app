import React, { useState } from "react";

//components
import { ActivityIndicator, ScrollView, Switch, View } from "react-native";
import Modal from "react-native-modal";
import { Img } from "../../image";
import { Button } from "../../button";
import { Card } from "../../card";
import { Field, Formik } from "formik";
import Input from "../../form/inputs";
import { Text } from "../../text";

//styles
import { styles } from "../pending-modal/styles";
import { styles as imgStyles } from "../../imageUploader/styles";
import { theme } from "../../../styles/theme";
import { shadowStyle } from "../../../styles/shadow";

//hooks
import { useModalStore } from "../../../store/modal-store";
import { useListStore } from "../../../store/list-store";

//env var
import { API_URL } from "@env";

//services
import attendance from "../../../services/attendance-services";
import list from "../../../services/list-service";
import { createAndSavePDF } from "../../../services/pdf-services";
import { ImageUploader } from "../../imageUploader";

export default function BeneficiariesModal() {
  const modalStore = useModalStore((state) => state);
  const listStore = useListStore((state) => state.beneficiaries);

  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  let children =
    modalStore.beneficiaries.beneficiariesData.children === ""
      ? ""
      : JSON.parse(modalStore.beneficiaries.beneficiariesData.children);
  const html = `
  <html>
  <head>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        font-family: "Inter", sans-serif;
        font-style: normal;
        color: #0b77c2;
      }
      h4 {
        margin: 0;
        padding: 0;
      }
      .content-text {
        font-size: 12px;
        font-family: sans-serif;
        margin: 0;
        padding: 2px 5px 0px 0;
      }
      .child-list {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      .container {
        display: flex;
        justify-content: space-between;
      }

      .content-wrapper {
        display: flex;
        align-items: center;
        background-color: #eee;
        box-shadow: 7px 7px 5px rgba(0, 0, 0, 0.102);
        width: 500px;
        height: 50px;
        margin-bottom: 18px;
        padding: 0 12px;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>
    <div>
      <!-- logo -->
      <img
        src="${API_URL}/assets/imgs/logo.png"
        alt="Muntaha Foundation"
        width="130"
        height="auto"
      />

      <h1>Beneficiary Profile</h1>
      <div class="container">
        <div class="">
          <img
            src="${API_URL}/assets/${
    modalStore.beneficiaries.beneficiariesData.image
  }"
            alt="${modalStore.beneficiaries.beneficiariesData.name}"
            width="150"
            height="150"
          />
        </div>
        <div class="inner-container">
          <div class="content-wrapper">
            <p class="content-text">
              ID: ${modalStore.beneficiaries.beneficiariesData.muntahaId}
            </p>
          </div>
          <div class="content-wrapper">
            <p class="content-text">
              Name: ${modalStore.beneficiaries.beneficiariesData.name}
            </p>
          </div>
          <div class="content-wrapper">
            <p class="content-text">
              Phone: ${modalStore.beneficiaries.beneficiariesData.phone}
            </p>
          </div>
          <div class="content-wrapper">
            <p class="content-text">
              age: ${modalStore.beneficiaries.beneficiariesData.age}
            </p>
          </div>
          <div class="content-wrapper">
            <p class="content-text">
              Address: ${modalStore.beneficiaries.beneficiariesData.address}
            </p>
          </div>
          <div class="content-wrapper">
              <p class="content-text">Children: ${children.length - 1}</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

  `;

  return (
    <Modal
      isVisible={modalStore.beneficiaries.isShow}
      backdropOpacity={0.7}
      onBackdropPress={modalStore.beneficiaries.hide}
      onBackButtonPress={modalStore.beneficiaries.hide}
      style={{ margin: 0, paddingHorizontal: 30 }}
    >
      <ScrollView style={{}}>
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
              id: modalStore.beneficiaries.beneficiariesData.id,
              image: "",
              name: modalStore.beneficiaries.beneficiariesData.name,
              sex: modalStore.beneficiaries.beneficiariesData.sex,
              age: modalStore.beneficiaries.beneficiariesData.age.toString(),
              phone: modalStore.beneficiaries.beneficiariesData.phone,
              address: modalStore.beneficiaries.beneficiariesData.address,
              maritalStatus:
                modalStore.beneficiaries.beneficiariesData.maritalStatus,
              jobStatus: modalStore.beneficiaries.beneficiariesData.jobStatus,
            }}
            onSubmit={(values, { setSubmitting }) => {
              //edit function call
              const editStatus = attendance.editBeneficiary(
                values,
                setSubmitting,
                setMessage
              );
              editStatus &&
                setTimeout(() => {
                  setMessage({
                    text: "",
                    type: "",
                  });
                  modalStore.beneficiaries.hide();
                }, 2000);
              list.fetchList(listStore.setListData, listStore.endpoint);
            }}
          >
            {({
              handleSubmit,
              isSubmitting,
              setFieldTouched,
              setFieldValue,
              setFieldError,
              errors,
            }) => (
              <>
                <ImageUploader
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  imageUri={`${API_URL}/assets/${modalStore.beneficiaries.beneficiariesData.image}`}
                  editable={edit}
                  error={errors.image}
                />
                <Switch
                  trackColor={{
                    false: theme.colors.tertiary,
                    true: theme.colors.primary,
                  }}
                  thumbColor={
                    edit ? theme.colors.background : theme.colors.primary
                  }
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setEdit(!edit)}
                  value={edit}
                />
                <Field
                  component={Input}
                  name="name"
                  label="Name"
                  placeholder="Name"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="sex"
                  label="Sex"
                  placeholder="Sex"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="age"
                  label="Age"
                  placeholder="Age"
                  type="number"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="phone"
                  label="Phone"
                  placeholder="Phone"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="address"
                  label="Address"
                  placeholder="Address"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="maritalStatus"
                  label="Marital Status"
                  placeholder="Marital Status"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="jobStatus"
                  label="Job Status"
                  placeholder="Job Status"
                  style={styles.input}
                  editable={edit}
                />

                {edit && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: 18,
                    }}
                  >
                    {/* TODO edit api call */}
                    {!isSubmitting && (
                      <Button
                        width={145}
                        label="Edit"
                        textColor="foreground"
                        bgColor="secondary"
                        pv={12}
                        borderRadius={30}
                        style={shadowStyle.shadow}
                        onPress={() => handleSubmit()}
                      />
                    )}
                    {isSubmitting && (
                      <Button
                        width={145}
                        textColor="foreground"
                        bgColor="secondary"
                        pv={12}
                        borderRadius={30}
                        style={shadowStyle.shadow}
                      >
                        <ActivityIndicator size="small" color="white" />
                      </Button>
                    )}
                    {/* TODO delete api call */}
                    <Button
                      width={145}
                      label="Delete"
                      textColor="foreground"
                      bgColor="background"
                      pv={12}
                      borderRadius={30}
                      style={shadowStyle.shadow}
                      onPress={() => {
                        modalStore.beneficiaries.hide();
                        modalStore.delete.show();
                      }}
                    />
                  </View>
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
                <Button
                  label="Save as PDF"
                  textColor="background"
                  bgColor="primary"
                  pv={12}
                  mt={22}
                  borderRadius={30}
                  style={{ width: "100%" }}
                  onPress={() => createAndSavePDF(html)}
                />
              </>
            )}
          </Formik>
        </Card>
      </ScrollView>
    </Modal>
  );
}
