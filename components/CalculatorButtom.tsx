import { Colors } from '@/constants/Colors';
import { globalStyles } from '@/styles/global-styles';
import { Pressable, Text, View } from 'react-native'
import * as Haptics from 'expo-haptics';


interface Props {
    label: string;
    color?: string;
    blackText?: boolean;
    doubleSize?: boolean
    onPress: () => void
}




const  CalculatorButton= ({label, color=Colors.darkGray , blackText=false, onPress, doubleSize= false
}: Props) => {
    return (
    <Pressable style={({pressed})=> ({ 
        ...globalStyles.button, 
        backgroundColor: color, 
        opacity: pressed ? 0.8 : 1, 
        width: doubleSize ? 180 : 80})}  
        onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPress();
        }}
    >
        
        <Text style={{...globalStyles.buttonText, color: blackText ? 'black' : 'white'}} >  
            {label}

        </Text>

    </Pressable>
    )
  
}
export default CalculatorButton
	