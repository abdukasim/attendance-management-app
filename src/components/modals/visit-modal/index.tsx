import React, { useState } from "react";

//components
import { ScrollView, TextInput, View } from "react-native";
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
import { API_URL } from "@env";

export default function VisitedModal() {
  const modalStore = useModalStore((state) => state.visited);

  const [audio, setAudio] = useState<Audio.Sound>();
  const [playing, setPlaying] = useState(false);

  async function playSound() {
    try {
      // Loading Sound
      const { sound } = await Audio.Sound.createAsync({
        uri: `${API_URL}${modalStore.visitedData.recording}`,
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
          <View style={imgStyles.imageContainer}>
            {modalStore.visitedData.image && (
              <Img
                source={{ uri: `${API_URL}${modalStore.visitedData.image}` }}
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

          <TextInput
            value={modalStore.visitedData.name}
            style={styles.input}
            editable={false}
          />
          <TextInput
            value={modalStore.visitedData.phone}
            style={styles.input}
            editable={false}
          />
          <TextInput
            value={modalStore.visitedData.sex}
            style={styles.input}
            editable={false}
          />
          <TextInput
            value={modalStore.visitedData.address}
            style={styles.input}
            editable={false}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{ flexDirection: "column", width: horizontalScale(151) }}
            >
              <TextInput
                value={String(modalStore.visitedData.age)}
                style={styles.input}
                editable={false}
              />
              <TextInput
                value={String(modalStore.visitedData?.rentAmount)}
                style={styles.input}
                editable={false}
              />
            </View>
            <View
              style={{ flexDirection: "column", width: horizontalScale(151) }}
            >
              <TextInput value="name" style={styles.input} editable={false} />
              <TextInput
                value={String(modalStore.visitedData.rentAmount)}
                style={styles.input}
                editable={false}
              />
            </View>
          </View>

          <Card height={126} style={styles.input}>
            <Text>{modalStore.visitedData.remark}</Text>
          </Card>

          <Button
            label="Accept"
            textColor="background"
            bgColor="primary"
            pv={12}
            borderRadius={30}
            style={{ width: "100%" }}
          />
        </Card>
      </ScrollView>
    </Modal>
  );
}
