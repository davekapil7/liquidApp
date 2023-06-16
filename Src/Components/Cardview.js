import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { COLOR } from '../Constant/color';

const CardView = (props) => {
    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.container}>
                <View style={styles.cardView}>
                    {props.children}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CardView;

export const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: COLOR.PRIMARY
    },
    container: {
        flex: 1,
        width:"100%",
        backgroundColor: COLOR.WHITE[100],
        alignItems: "center",
        justifyContent: "center"
    },
    cardView: {
        backgroundColor: COLOR.SECONDRY,
        paddingHorizontal: 30,

        padding: 20,
        borderRadius: 20,
        width: '85%',
        height: "65%",
        alignItems: 'center',
        justifyContent: "space-between"
    }
})