import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Pressable,StyleSheet, Text } from 'react-native'

export default function IconsButton({onPress, icon, label}){
    return(
        <>
            <Pressable style={styles.iconsButton} onPress={onPress}>
                <MaterialIcons name={icon} size={34} color='#fff'/>
                <Text  style={styles.iconButtonLabel}>{label}</Text>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    iconsButton:{
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    iconButtonLabel:{
        color: '#fff',
        marginTop: 12,
    }
})