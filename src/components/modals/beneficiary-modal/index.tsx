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
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import attendance from "../../../services/attendance-services";
import list from "../../../services/list-service";

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
          html, body {
            margin: 0;
            padding: 0;
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
            background-color: red;
          }
          .child-list {
            width: 100%
            display: flex;
            flex-direction: column;
          }
        </style>
      </head>
      <body>
          <div>
            <img src="${API_URL}/assets/imgs/MuntahaFoundationLogo.png" alt="Muntaha Foundation" width="100" height="150" />
            <hr />
            <div className="content-wrapper">
              <h4>Image</h4>
            <img src="${API_URL}/assets/${
    modalStore.beneficiaries.beneficiariesData.image
  }" alt=${
    modalStore.beneficiaries.beneficiariesData.name
  } width="100" height="100" style={border-radius: 999} />
            </div>
            <div className="content-wrapper">
            <h4>Name</h4>
            <p className="content-text">${
              modalStore.beneficiaries.beneficiariesData.name
            }</p>
          </div>
            <div className="content-wrapper">
              <h4>Phone</h4>
              <p className="content-text">${
                modalStore.beneficiaries.beneficiariesData.phone
              }</p>
            </div>
            <div className="content-wrapper">
              <h4>age</h4>
              <p className="content-text">${
                modalStore.beneficiaries.beneficiariesData.age
              }</p>
            </div>
            <div className="content-wrapper">
            <h4>Address</h4>
            <p className="content-text">${
              modalStore.beneficiaries.beneficiariesData.address
            }</p>
          </div>
          <div className="content-wrapper">
          ${
            children === "" || children[0].name === ""
              ? `
              <div>
                <h4>Children</h4>
                <p className="content-text">0</p>
              </div>`
              : children.map(
                  (child: any) =>
                    `<div key={index} className="child-list">
                    <h4>Child Name</h4>
                  <p className="content-text">${child.name}</p>
                  <h4>Child Age</h4>
                  <p className="content-text">${child.age}</p>
                  <h4>Child Schooling</h4>
                  <p className="content-text">${child.schooling}</p>
                </div>`
                )
          } 
        </div>
          </div>
      </body>
    </html>
  `;
  const createAndSavePDF = async (html: any) => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: html,
        base64: false,
      });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
    }
  };

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
              // image: "",
              name: modalStore.beneficiaries.beneficiariesData.name,
              sex: modalStore.beneficiaries.beneficiariesData.sex,
              age: modalStore.beneficiaries.beneficiariesData.age,
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
            {({ handleSubmit, isSubmitting }) => (
              <>
                <View style={imgStyles.imageContainer}>
                  {modalStore.beneficiaries.beneficiariesData.image && (
                    <Img
                      source={{
                        uri: `${API_URL}/assets/${modalStore.beneficiaries.beneficiariesData.image}`,
                      }}
                      width="100%"
                      height="100%"
                    />
                  )}
                </View>
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
