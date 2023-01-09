import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { auth } from "../services/auth-service";
import storage from "../services/storage-services";
import { useSessionStore } from "../store/session-store";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const sessionStore = useSessionStore((state) => state);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "Articulat CF": require("../../assets/fonts/ArticulatCF-Normal.ttf"),
        });

        // resume session if token exists
        const sessionData = await storage.getData("sessionData");

        if (sessionData !== null) {
          const userStatus = await auth.resumeSession(sessionData);
          userStatus && sessionStore.setAuthUser(sessionData.type);
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
