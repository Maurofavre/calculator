    import { globalStyles } from '@/styles/global-styles';
    import { Color } from 'expo-router'
    import { Text, type TextProps, View } from 'react-native'

    interface Props extends TextProps{
        variant?: 'h1'|'h2';
    }

    const  ThemeText = ({children, variant,...rest}: Props) => {
        return (
            <Text style={[{color:'white', fontFamily:'SpaceMono'}, variant === 'h1' ? globalStyles.mainResult : globalStyles.subResult ]}
             numberOfLines={1} adjustsFontSizeToFit 
            {...rest}> 
            {children} 
            </Text>
        )
    
    }
    export default ThemeText