import {
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { Text } from "../../../components/text";
import DropDownPicker from "react-native-dropdown-picker";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../../styles/theme";
import { Card } from "../../../components/card";
import { Button } from "../../../components/button";
import { shadowStyle } from "../../../styles/shadow";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { reports } from "../../../services/report-services";
import { AbsentReportListModel } from "../../../models/report";

import { API_URL } from "@env";
import { createAndSavePDF } from "../../../services/pdf-services";

export function ReportScreen() {
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [startDate, setStartDate] = useState({
    timestamp: new Date(),
    date: "",
  });
  const [endDate, setEndDate] = useState({ timestamp: new Date(), date: "" });

  const [attendanceReport, setAttendanceReport] = useState([]);
  const [attendanceReportSummary, setAttendanceReportSummary] = useState({
    present: 0,
    absent: 0,
    permission: 0,
  });
  const [absentReport, setAbsentReport] = useState([]);

  useEffect(() => {
    reports.getAttendanceReport(
      startDate.timestamp,
      endDate.timestamp,
      setAttendanceReport,
      setAttendanceReportSummary
    );
    reports.getAbsentReport(
      startDate.timestamp,
      endDate.timestamp,
      setAbsentReport
    );
  }, [startDate, endDate]);

  const html = `
    <html>
      <head>
        <style>
        h2{
        color: #0b77c2;
        }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th {
        color: #0b77c2;
          }
          th, td {
            text-align: left;
            padding: 8px;
          }
          tr:nth-child(even){background-color: #f2f2f2}
        </style>
      </head>
      <body>
      <div>
        <img src="${API_URL}/assets/imgs/logo.png" alt="Muntaha Foundation" width="150" height="auto" />
      </div>

        <h2>Attendance Report</h2>

        <table>
          <tr>
            <th>Duration</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Permission</th>
          </tr>
          ${attendanceReport
            .map((item: any) => {
              return `
              <tr>
                <td>
                ${item.timestamp.slice(0, 10)}
                </td>
                <td>${item.present}</td>
                <td>${item.absent}</td>
                <td>${item.permission}</td>
              </tr>
            `;
            })
            .join(" ")}
            <tr>
              <th>Total</th>
              <th>${attendanceReportSummary.present}</th>
              <th>${attendanceReportSummary.absent}</th>
              <th>${attendanceReportSummary.permission}</th>
            </tr>
        </table>

        <h2>Absent Report</h2>

        <table>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>ID</th>
          </tr>
          ${absentReport
            .map((item: AbsentReportListModel, index) => {
              return `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.name}</td>
                  <td>${item.phone}</td>
                  <td>${item.muntahaId}</td>
                </tr>
              `;
            })
            .join(" ")}
        </table>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selectors}>
        <View style={styles.selector}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5 name="edit" size={12} color={theme.colors.primary} />
            <Text variant="body" color="primary" ml={9} mb={13}>
              Start Date
            </Text>
          </View>
          <Pressable onPress={() => setShowStartDate(true)}>
            <View pointerEvents="none">
              <TextInput
                style={styles.pickerInput}
                placeholder="Include"
                value={startDate.date}
              />
            </View>
          </Pressable>
          {showStartDate && (
            <DateTimePicker
              mode="date"
              value={new Date()}
              maximumDate={new Date()}
              onChange={(e) => {
                reports.onDateChange(e, setShowStartDate, setStartDate);
              }}
            />
          )}
        </View>

        <View style={styles.selector}>
          <View style={{ flexDirection: "row" }}>
            <Feather name="bar-chart" size={12} color={theme.colors.primary} />
            <Text variant="body" color="primary" ml={9} mb={13}>
              End Date
            </Text>
          </View>
          <Pressable onPress={() => setShowEndDate(true)}>
            <View pointerEvents="none">
              <TextInput
                style={styles.pickerInput}
                placeholder="Include"
                value={endDate.date}
              />
            </View>
          </Pressable>
          {showEndDate && (
            <DateTimePicker
              mode="date"
              value={new Date()}
              maximumDate={new Date()}
              minimumDate={new Date(startDate.timestamp!)}
              onChange={(e) => {
                reports.onDateChange(e, setShowEndDate, setEndDate);
              }}
            />
          )}
        </View>
      </View>

      <Text variant="headerSm">Daily</Text>
      <Text variant="headerXl" color="primary" mb={28}>
        {startDate.date} - {endDate.date}
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
            {attendanceReportSummary.present}
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
            {attendanceReportSummary.absent}
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
            {attendanceReportSummary.permission}
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
        onPress={() => createAndSavePDF(html)}
      />

      <Text variant="subtitle" color="primary" mb={18}>
        Absent Beneficiaries
      </Text>

      <ScrollView>
        <View style={styles.tableHeader}>
          <Text style={{ flex: 1 }}>No.</Text>
          <Text style={{ flex: 3 }}>Name</Text>
          <Text style={{ flex: 2 }}>Phone Number</Text>
        </View>

        <View style={styles.tableSeparator}></View>

        {absentReport.map((item: AbsentReportListModel, index) => (
          <View style={styles.tableBody} key={item.muntahaId}>
            <Text style={{ flex: 1 }}>{index + 1}</Text>
            <Text style={{ flex: 3 }}>{item.name}</Text>
            <Text style={{ flex: 2 }}>{item.phone}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
