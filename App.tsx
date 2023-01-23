//libs
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MainNavigation } from "./src/navigation/main";
import { RootSiblingParent } from "react-native-root-siblings";

//hooks
import useCachedResources from "./src/hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <SafeAreaProvider>
          <MainNavigation />
          <StatusBar
            backgroundColor={"transparent"}
            translucent
            style="inverted"
          />
        </SafeAreaProvider>
      </RootSiblingParent>
    );
  }
}
