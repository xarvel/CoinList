import 'react-native-reanimated';
import { useFonts } from 'expo-font';

import CoinListScreen from "@/components/CoinListScreen";

export default function RootLayout() {
  const [loaded] = useFonts({
    'SFProText-Regular': require('../assets/fonts/SF-Pro-Text-Regular.otf')
  });

  if (!loaded) {
    return null;
  }

  return (
      <CoinListScreen/>
  );
}
