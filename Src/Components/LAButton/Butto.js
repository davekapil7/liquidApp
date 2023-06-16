import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLOR } from '../../Constant/color';

const LAButton = ({ title, textstyle, viewStyle , handlepress }) => {
    return (
        <TouchableOpacity style={[styles.constainer, viewStyle]} onPress={() => handlepress()}>
            <Text style={[styles.text, textstyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default LAButton;

export const styles = StyleSheet.create({
    constainer: {
        backgroundColor: COLOR.PRIMARY, height: 30, width: 130,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 12,
        color: COLOR.WHITE[100],
        fontWeight:"700",
        fontFamily: "Poppins-Regular",

    }

})