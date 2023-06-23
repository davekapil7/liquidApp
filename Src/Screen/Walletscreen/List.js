import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Modal
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
import { useNavigation } from '@react-navigation/native';
import { NAV } from '../../Constant/navkey';

const List = () => {

    const navigation = useNavigation()
    return (
        <Theambackground title={STR.LIST.LIST}
            subtitle={STR.LIST.LIST_DIRECTOR}
            radius={false}
            setting={true}
            scan={true}
            scroll={false}>
            <View style={{ flex: 1, margin: 25 }}>
                <PoppinsText textstyle={styles.title}
                    title={STR.LIST.TITLE} />

                <View style={styles.rowcontainer}>
                    <View style={styles.rowview}>
                        <PoppinsText title={STR.LIST.NAME}
                            textstyle={styles.rowtext} />
                    </View>
                    <View style={styles.rowview}>
                        <PoppinsText title={STR.LIST.ID_PASS}
                            textstyle={styles.rowtext} />
                    </View>
                </View>

                {list.map((item, i) => {
                    const ID = item.id
                    return (

                        <View style={{ ...styles.rowcontainer, marginTop: 10, alignItems: "center" }}>
                            <View style={styles.rowview}>
                                <PoppinsText title={item.name}
                                    textstyle={styles.rowtext} />
                            </View>
                            <View style={styles.rowview}>
                                <PoppinsText title={`${ID.substring(0, 4)}******`}
                                    textstyle={styles.rowtext} />
                            </View>

                            <LAButton title={STR.BUTTON.VERIFY}
                                viewStyle={styles.button}
                                handlepress={() => navigation.navigate(NAV.LOGIN_IM_SMART)} />
                        </View>

                    );
                })}


            </View>
        </Theambackground>

    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "700"
    },
    button: {
        width: 82,
    },
    rowcontainer: { flexDirection: "row", marginTop: 25 },
    rowview: { width: "40%" },
    rowtext: { fontSize: 15 },
});


export default List;
