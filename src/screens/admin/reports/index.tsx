import { View, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { Text } from "../../../components/text";
import DropDownPicker from "react-native-dropdown-picker";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../../styles/theme";
import { Card } from "../../../components/card";
import { Button } from "../../../components/button";
import { shadowStyle } from "../../../styles/shadow";

export function ReportScreen() {
  const [durationOptions, setDurationOptions] = useState([
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "week" },
    { label: "Monthly", value: "month" },
  ]);
  const [openDuration, setOpenDuration] = useState(false);
  const [durationValue, setDuationValue] = useState("week");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selectors}>
        <View style={styles.selector}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5 name="edit" size={12} color={theme.colors.primary} />
            <Text variant="body" color="primary" ml={9} mb={13}>
              Select Duration
            </Text>
          </View>
          <DropDownPicker
            listMode="SCROLLVIEW"
            zIndex={3000}
            zIndexInverse={1000}
            placeholder="Shelter Status"
            open={openDuration}
            value={durationValue}
            items={durationOptions}
            setOpen={setOpenDuration}
            setValue={setDuationValue}
            setItems={setDurationOptions}
            style={styles.pickerInput}
          />
        </View>

        <View style={styles.selector}>
          <View style={{ flexDirection: "row" }}>
            <Feather name="bar-chart" size={12} color={theme.colors.primary} />
            <Text variant="body" color="primary" ml={9} mb={13}>
              Report Includes
            </Text>
          </View>
          <TextInput style={styles.pickerInput} placeholder="Include" />
        </View>
      </View>

      <Text variant="headerSm">Weekly</Text>
      <Text variant="headerXl" color="primary" mb={28}>
        Nov 12 - Dec 06
      </Text>

      <View style={styles.cardsContainer}>
        <Card
          borderRadius={20}
          width={118}
          height={113}
          bgColor="background"
          style={styles.cardFlexStyles}
        >
          <Text variant="title" color="primary">
            50
          </Text>

          <Text variant="body" color="primary" mt={17} ml={4}>
            Present
          </Text>
        </Card>

        <Card
          borderRadius={20}
          width={118}
          height={113}
          bgColor="background"
          style={styles.cardFlexStyles}
        >
          <Text variant="title" color="primary">
            170
          </Text>

          <Text variant="body" color="primary" mt={17} ml={4}>
            Absent
          </Text>
        </Card>

        <Card
          borderRadius={20}
          width={118}
          height={113}
          bgColor="background"
          style={styles.cardFlexStyles}
        >
          <Text variant="title" color="primary">
            220
          </Text>

          <Text variant="body" color="primary" mt={17} ml={4}>
            Permission
          </Text>
        </Card>
      </View>

      <Button
        label="Save as PDF"
        textColor="background"
        bgColor="primary"
        pv={16}
        mb={26}
        borderRadius={30}
        style={shadowStyle.shadow}
      />

      <Text variant="subtitle" color="primary" mb={18}>
        Absent Beneficiaries
      </Text>

      <View>
        <View style={styles.tableHeader}>
          <Text style={{ flex: 1 }}>No.</Text>
          <Text style={{ flex: 3 }}>Name</Text>
          <Text style={{ flex: 2 }}>Phone Number</Text>
        </View>

        <View style={styles.tableSeparator}></View>

        <View style={styles.tableBody}>
          <Text style={{ flex: 1 }}>01</Text>
          <Text style={{ flex: 3 }}>Abebe Kebede</Text>
          <Text style={{ flex: 2 }}>+25191234567</Text>
        </View>
        <View style={styles.tableBody}>
          <Text style={{ flex: 1 }}>01</Text>
          <Text style={{ flex: 3 }}>Abebech Kebedech</Text>
          <Text style={{ flex: 2 }}>+25191234567</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
