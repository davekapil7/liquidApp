import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLOR } from '../../Constant/color';

const PoppinsText = ({ title, textstyle , viewStyle }) => {
    return (
        <View style={[styles.constainer , viewStyle]}>
            <Text style={[styles.text,textstyle]}>{title}</Text>
        </View>
    )
}

export default PoppinsText;

export const styles = StyleSheet.create({
    constainer: {

    },
    text: {
        fontSize: 12,
        color: COLOR.BLACK[100],
      fontFamily: "Poppins-Regular",

    }

})