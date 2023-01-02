import React, { useState } from "react";

//components
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import { Microphone } from "../../../assets/svg/microphone-icon";
import { theme } from "../../styles/theme";
import { Button } from "../button";
import { Text } from "../text";

//styles
import { styles } from "./styles";

//libs
import { Audio, AVPlaybackStatus } from "expo-av";

interface AudioRecorderProps {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => void;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  setFieldValue,
}) => {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [audio, setAudio] = useState<Audio.Sound>();
  const [playing, setPlaying] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null | undefined>();

  async function startRecording() {
    try {
      // Requesting permissions
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      // Starting recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      // Recording started
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    //  Recording stopped and stored at", uri
    setAudioUri(uri);
    setFieldValue("recording", uri);
  }

  async function playSound() {
    // Loading Sound
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri! });
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
  }

  async function pauseSound() {
    // Pausing Sound
    await audio?.pauseAsync();
    setPlaying(false);
  }
  return (
    <View style={styles.container}>
      <View style={styles.recorders}>
        <Button
          borderRadius={100}
          bgColor="primary"
          textColor="secondary"
          width={29}
          height={29}
          style={styles.recorderBtn}
          onPress={recording ? stopRecording : startRecording}
        >
          {recording ? (
            <FontAwesome name="stop" size={10} color={theme.colors.secondary} />
          ) : (
            <Microphone />
          )}
        </Button>
        <Text variant="headerSm">Record Audio</Text>
      </View>
      <View style={styles.recorders}>
        <Button
          borderRadius={100}
          bgColor="primary"
          textColor="secondary"
          width={29}
          height={29}
          style={styles.recorderBtn}
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
    </View>
  );
};
