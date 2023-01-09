import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import { MainNavigation } from "./src/navigation/main";

export default function App() {
  const isLoadingComplete = useCachedResources();

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
