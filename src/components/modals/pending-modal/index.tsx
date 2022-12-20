import { View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useModalStore } from "../../../store/modal-store";
import { Card } from "../../card";
import { Text } from "../../text";
import { Button } from "../../button";
import { styles } from "./styles";
import { ImageUploader } from "../../imageUploader";
import { Field, Formik } from "formik";
import * as yup from "yup";
import Input from "../../form/inputs";
import { theme } from "../../../styles/theme";

const PendingListValidationSchema = yup.object().shape({
  age: yup.number().required("Age is required"),
  shelterStatus: yup.string().required("Shelter Status is required"),
  jobStatus: yup.string().required("Job Status is required"),
  maritalStatus: yup.string().required("Marital Status is required"),
});

export default function PendingModal() {
  const modaleStore = useModalStore((state) => state);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => modaleStore.pending.hide()}
        style={styles.backdrop}
      ></TouchableOpacity>
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
            id: modaleStore.pending.pendingData.id,
            image: "",
            age: "",
            maritalStatus: "",
            children: [{ name: "", age: "", schooling: "" }],
            jobStatus: "",
            shelterStatus: "",
            rent: "",
            remark: "",
          }}
          // validationSchema={PendingListValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // handleWaitingListForm(values, setSubmitting);
            console.log(values);
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
                name="age"
                placeholder="Age"
                placeholderTextColor={theme.colors.foreground}
                autoFocus={true}
                blurOnSubmit={false}
                style={styles.input}
              />
              <Button
                label="Register"
                textColor="background"
                bgColor="primary"
                mt={50}
                style={{ width: "100%" }}
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
      </Card>
    </View>
  );
}
