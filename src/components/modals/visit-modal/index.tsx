import React, { useState } from "react";

//components
import { ActivityIndicator, ScrollView, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { Button } from "../../button";
import { Card } from "../../card";
import { Text } from "../../text";
import { Img } from "../../image";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";

//styles
import { styles } from "../pending-modal/styles";
import { styles as imgStyles } from "../../imageUploader/styles";
import { styles as audioStyles } from "../../audio-recorder/styles";
import { horizontalScale } from "../../../helpers/metrics";
import { theme } from "../../../styles/theme";

//hooks
import { useModalStore } from "../../../store/modal-store";
import { useListStore } from "../../../store/list-store";

//env var
import { API_URL } from "@env";

//services
import visit from "../../../services/visit-service";
import list from "../../../services/list-service";

export default function VisitedModal() {
  const modalStore = useModalStore((state) => state);
  const listStore = useListStore((state) => state.visited);

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [audio, setAudio] = useState<Audio.Sound>();
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  async function playSound() {
    try {
      // Loading Sound
      const { sound } = await Audio.Sound.createAsync({
        uri: `${API_URL}/assets/${modalStore.visited.visitedData.recording}`,
      });
      setAudio(sound);
      // Souncd loaded

      // Playing Sound
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(async (status: any) => {
        status.isPlaying && setPlaying(true);
        if (status.didJustFinish) {
          // Finished
          setPlaying(false);
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function pauseSound() {
    // Pausing Sound
    await audio?.pauseAsync();
    setPlaying(false);
  }

  return (
    <Modal
      isVisible={modalStore.visited.isShow}
      backdropOpacity={0.7}
      onBackdropPress={modalStore.visited.hide}
      onBackButtonPress={modalStore.visited.hide}
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
          <View style={imgStyles.imageContainer}>
            {modalStore.visited.visitedData.image && (
              <Img
                source={{
                  uri: `${API_URL}/assets/${modalStore.visited.visitedData.image}`,
                }}
                width="100%"
                height="100%"
              />
            )}
          </View>

          <View style={audioStyles.recorders}>
            <Button
              borderRadius={100}
              bgColor="primary"
              textColor="secondary"
              width={29}
              height={29}
              style={audioStyles.recorderBtn}
              onPress={playing ? pauseSound : playSound}
            >
              {playing ? (
                <FontAwesome
                  name="pause"
                  size={10}
                  color={theme.colors.secondary}
                />
              ) : (
                <FontAwesome5
                  name="play"
                  size={10}
                  color={theme.colors.secondary}
                />
              )}
            </Button>
            <Text variant="headerSm">Play</Text>
          </View>

          <Text variant="headerSm" ml={12} mb={8} color="primary">
            Name
          </Text>
          <TextInput
            value={modalStore.visited.visitedData.name}
            style={styles.input}
            editable={false}
          />

          <Text variant="headerSm" ml={12} mb={8} color="primary">
            Phone Number
          </Text>
          <TextInput
            value={modalStore.visited.visitedData.phone}
            style={styles.input}
            editable={false}
          />

          <Text variant="headerSm" ml={12} mb={8} color="primary">
            Sex
          </Text>
          <TextInput
            value={modalStore.visited.visitedData.sex}
            style={styles.input}
            editable={false}
          />

          <Text variant="headerSm" ml={12} mb={8} color="primary">
            Address
          </Text>
          <TextInput
            value={modalStore.visited.visitedData.address}
            style={styles.input}
            editable={false}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "column", width: horizontalScale(151) }}
            >
              <Text variant="headerSm" ml={12} mb={8} color="primary">
                Age
              </Text>
              <TextInput
                value={String(modalStore.visited.visitedData.age)}
                style={styles.input}
                editable={false}
              />

              <Text variant="headerSm" ml={12} mb={8} color="primary">
                Shelter Status
              </Text>
              <TextInput
                value={String(modalStore.visited.visitedData?.shelterStatus)}
                style={styles.input}
                editable={false}
              />
            </View>
            <View
              style={{ flexDirection: "column", width: horizontalScale(151) }}
            >
              <Text variant="headerSm" ml={12} mb={8} color="primary">
                Marital Status
              </Text>
              <TextInput
                value={modalStore.visited.visitedData.maritalStatus}
                style={styles.input}
                editable={false}
                placeholder="Marital"
              />

              <Text variant="headerSm" ml={12} mb={8} color="primary">
                Rent Amount
              </Text>
              <TextInput
                value={String(modalStore.visited.visitedData.rentAmount)}
                style={styles.input}
                editable={false}
                placeholder="Rent"
              />
            </View>
          </View>

          <Text variant="headerSm" ml={12} mb={8} color="primary">
            Remark
          </Text>
          <Card height={126} style={styles.input}>
            <Text>{modalStore.visited.visitedData.remark || "Remark"}</Text>
          </Card>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {!loading && (
              <Button
                label="Accept"
                textColor="background"
                bgColor="primary"
                pv={12}
                mt={50}
                borderRadius={30}
                width={145}
                onPress={async () => {
                  setLoading(true);
                  const visitedStatus = await visit.addToAttendance(
                    modalStore.visited.visitedData.id,
                    setMessage
                  );
                  if (visitedStatus) {
                    setTimeout(() => {
                      setMessage({
                        text: "",
                        type: "",
                      });
                      modalStore.visited.hide();
                    }, 2000);
                    list.fetchList(listStore.setListData, listStore.endpoint);
                  }
                  setLoading(false);
                }}
              />
            )}
            {loading && (
              <Button
                borderRadius={30}
                pv={12}
                textColor="background"
                bgColor="primary"
                mt={50}
                width={145}
              >
                <ActivityIndicator size="small" color="white" />
              </Button>
            )}
            <Button
              label="Delete"
              textColor="background"
              bgColor="failure"
              mt={50}
              pv={12}
              borderRadius={30}
              width={145}
              onPress={() => {
                modalStore.visited.hide();
                modalStore.delete.show();
              }}
            />
          </View>

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
        </Card>
      </ScrollView>
    </Modal>
  );
}
