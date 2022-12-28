import React, { useState } from "react";
import { ScrollView, Switch, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { useModalStore } from "../../../store/modal-store";
import { Button } from "../../button";
import { Card } from "../../card";
import { styles } from "../pending-modal/styles";
import { styles as imgStyles } from "../../imageUploader/styles";
import { Img } from "../../image";
import { API_URL } from "@env";
import { theme } from "../../../styles/theme";
import { Field, Formik } from "formik";
import Input from "../../form/inputs";
import { shadowStyle } from "../../../styles/shadow";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function BeneficiariesModal() {
  const modalStore = useModalStore((state) => state.beneficiaries);
  const [edit, setEdit] = useState(false);

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
            <img src="http://api.muntahafoundation.org/assets/imgs/MuntahaFoundationLogo.png" alt="Muntaha Foundation" width="100" height="150" />
            <hr />
            <div className="content-wrapper">
              <h4>Image</h4>
            <img src="http://api.muntahafoundation.org${
              modalStore.beneficiariesData.image
            }" alt=${
    modalStore.beneficiariesData.name
  } width="100" height="100" style={border-radius: 999} />
            </div>
            <div className="content-wrapper">
            <h4>Name</h4>
            <p className="content-text">${modalStore.beneficiariesData.name}</p>
          </div>
            <div className="content-wrapper">
              <h4>Phone</h4>
              <p className="content-text">${
                modalStore.beneficiariesData.phone
              }</p>
            </div>
            <div className="content-wrapper">
              <h4>age</h4>
              <p className="content-text">${
                modalStore.beneficiariesData.age
              }</p>
            </div>
            <div className="content-wrapper">
            <h4>Address</h4>
            <p className="content-text">${
              modalStore.beneficiariesData.address
            }</p>
          </div>
          <div className="content-wrapper">
          ${
            modalStore.beneficiariesData.children?.length
              ? modalStore.beneficiariesData.children.map(
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
              : `
              <div>
                <h4>Children</h4>
                <p className="content-text">${modalStore.beneficiariesData.children?.length}</p>
              </div>`
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
      isVisible={modalStore.isShow}
      backdropOpacity={0.7}
      onBackdropPress={modalStore.hide}
      onBackButtonPress={modalStore.hide}
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
              id: modalStore.beneficiariesData.id,
              // image: "",
              name: modalStore.beneficiariesData.name,
              sex: modalStore.beneficiariesData.sex,
              age: modalStore.beneficiariesData.age,
              phone: modalStore.beneficiariesData.phone,
              address: modalStore.beneficiariesData.address,
              maritalStatus: modalStore.beneficiariesData.maritalStatus,
              jobStatus: modalStore.beneficiariesData.jobStatus,
            }}
            onSubmit={(values, { setSubmitting }) => {
              //edit function call
              setTimeout(() => {
                modalStore.hide();
              }, 2000);
            }}
          >
            {({ handleSubmit }) => (
              <>
                <View style={imgStyles.imageContainer}>
                  {modalStore.beneficiariesData.image && (
                    <Img
                      source={{
                        uri: `${API_URL}${modalStore.beneficiariesData.image}`,
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
                  placeholder="Name"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="sex"
                  placeholder="Sex"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="age"
                  placeholder="Age"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="phone"
                  placeholder="Phone"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="address"
                  placeholder="Address"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="maritalStatus"
                  placeholder="Marital Status"
                  style={styles.input}
                  editable={edit}
                />
                <Field
                  component={Input}
                  name="jobStatus"
                  placeholder="Job Status"
                  style={styles.input}
                  editable={edit}
                />

                {edit && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginBottom: 22,
                    }}
                  >
                    {/* TODO edit api call */}
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
                    {/* TODO delete api call */}
                    <Button
                      width={145}
                      label="Delete"
                      textColor="foreground"
                      bgColor="background"
                      pv={12}
                      borderRadius={30}
                      style={shadowStyle.shadow}
                    />
                  </View>
                )}

                <Button
                  label="Save as PDF"
                  textColor="background"
                  bgColor="primary"
                  pv={12}
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
