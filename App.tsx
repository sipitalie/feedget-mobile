import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from './src/theme';
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts,
  Inter_400Regular,
  Inter_500Medium 
} from '@expo-google-fonts/inter';
import { useCallback, useEffect, useState } from 'react';
import { Widget } from './src/components/widget';

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium });
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      if(fontsLoaded){setAppIsReady(true);}
    }
    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);


  if (!appIsReady) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Widget/>
      <StatusBar 
        style="light"
        backgroundColor='transparent'
        translucent
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  text:{
    color: theme.colors.text_primary
  }
});
