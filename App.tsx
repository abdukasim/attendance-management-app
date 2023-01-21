import { SOCKET_API_URL } from "@env";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { io } from "socket.io-client";

import useCachedResources from "./src/hooks/useCachedResources";
import { MainNavigation } from "./src/navigation/main";

export default function App() {
  const isLoadingComplete = useCachedResources();

  const socket = io(SOCKET_API_URL);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected); // true
    });
    return () => {
      socket && socket.disconnect();
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <MainNavigation />
        <StatusBar
          backgroundColor={"transparent"}
          translucent
          style="inverted"
        />
      </SafeAreaProvider>
    );
  }
}
