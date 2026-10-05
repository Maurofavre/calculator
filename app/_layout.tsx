import { StatusBar, Text, View } from 'react-native';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { Colors } from '@/constants/Colors';
import { globalStyles } from '@/styles/global-styles';


const RootLayout = () => {

  const [loaded] = useFonts({
    spaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={globalStyles.Background}>
   
      <Slot /> 
      <StatusBar style='light' />
    </View>
  );
};



export default RootLayout;