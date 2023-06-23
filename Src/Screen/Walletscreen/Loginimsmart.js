import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Modal,
    SafeAreaView
} from 'react-native';
import { useSelector } from 'react-redux';
import axiosInstance from '../../Constant/axios';
import { Toast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createcompanyrequest, getCarddata } from '../../Function/Apicall';
import Theambackground from '../../Components/Theambackground';
import PoppinsText from '../../Components/LAText/Poppinstext';
import { STR } from '../../Constant/string';
import { COLOR } from '../../Constant/color';
import LAButton from '../../Components/LAButton/Butto';
import { list } from '../../Constant/json';
import { log } from 'react-native-reanimated';

const LoginIMSmart = () => {


    return (
        <SafeAreaView style={styles.safearea}>
            <View style={styles.container}>
                <View style={styles.uperview}>
                    <PoppinsText textstyle={styles.titletext}
                        title={STR.LOGINIMSMART.TITLE} />
                    <PoppinsText textstyle={styles.subtitletext}
                        title={STR.LOGINIMSMART.DIGITAL} />
                    <PoppinsText textstyle={styles.subtitletext}
                        title={STR.LOGINIMSMART.TECH} />
                </View>
                <View style={styles.lowerview}>
                    <PoppinsText textstyle={styles.lowertext}
                        title={STR.LOGINIMSMART.MSG} />

                    <LAButton viewStyle={styles.continuebtn}
                        title={STR.BUTTON.CONTINUE}
                        textstyle={styles.continuetext} />

                    <LAButton viewStyle={styles.canclebtn}
                        title={STR.BUTTON.CANCLE}
                        textstyle={styles.cancletext}
                        handlepress={() => console.log("Under PRoduction")} />
                </View>
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    safearea: { flex: 1, backgroundColor: COLOR.PRIMARY },
    container: { flex: 1, backgroundColor: COLOR.GRAY[700] },
    uperview: {
        height: "40%",
        padding: 25,
        justifyContent: "center"
    },
    titletext: {
        fontSize: 16,
        fontWeight: "700",
        color: COLOR.WHITE[100]
    },
    subtitletext: {
        fontSize: 15,
        marginTop: 10,
        color: COLOR.WHITE[100]
    },
    lowerview: {
        flex: 1,

        backgroundColor: COLOR.WHITE[100],
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 40
    },
    lowertext: {
        fontSize: 15,

    },
    continuebtn: {
        position: "absolute",
        bottom: 60,
        alignSelf: "center",
        width: 230,
        backgroundColor: COLOR.GRAY[700],
        height: 42,
        borderRadius: 50

    },
    continuetext: {
        fontSize: 16
    },
    canclebtn: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        backgroundColor: COLOR.WHITE[100]
    },
    cancletext: {
        color: COLOR.BLACK[100],
        fontSize: 12,
        width: 43
    },
});


export default LoginIMSmart;
