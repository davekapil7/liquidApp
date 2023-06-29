import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Image,
    TextInput,
    Animated,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Share,
    Linking,
    Modal,
    StyleSheet,
} from 'react-native';
import { STR } from '../../Constant/string';

import { COLOR } from '../../Constant/color';

import { useSelector, useDispatch } from 'react-redux';

import Theambackground from '../../Components/Theambackground';
import PoppinsText from '../../Components/LAText/Poppinstext';
import { IMG } from '../../Constant/image';
import { Icon } from '@rneui/themed';
import LAButton from '../../Components/LAButton/Butto';
import axiosInstance from '../../Constant/axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';
import { iAMSmartCall } from '../../Function/Apicall';


const HEIGHT = Dimensions.get('screen').height;

const Userdetail = () => {
    const dispatch = useDispatch();
    const profileData = useSelector(state => state?.appstate?.profileData);
    const imsmartData = useSelector(state => state?.appstate?.imsmartdata);
    const [birthdate, setBirthdate] = useState("")
    const navigation = useNavigation()

    const [data, setData] = useState(false)

    // const iAMSmartCall = async () => {
    //     axiosInstance
    //         .get('iamsmart/IAMSMART_login', {
    //             params: {
    //                 source: 'android',
    //                 redirect_uri: 'https://api.liquid.com.hk/mobile/redirect',
    //             },
    //         })
    //         .then(function (responseJson) {
    //             if (responseJson.status === 200) {
    //                 // dispatch({ type: 'ADD_CARDS', payload: responseJson?.data?.data?.items });
    //                 console.log('Response for jump', responseJson.data.data);
    //                 //  setLoader(true);

    //                 let iAmSmartRes = responseJson?.data?.data;
    //                 console.log("H!");
    //                 if (iAmSmartRes.url && iAmSmartRes.url.length > 0) {
    //                     console.log("HEllo", iAmSmartRes.url)
    //                     Linking.openURL(iAmSmartRes.url);
    //                 }
    //             }
    //         })
    //         .catch(function (error) {

    //             Toast.show({
    //                 topOffset: 100,
    //                 type: "error",
    //                 text1: "ERROR",
    //                 text2: `Somthing Went Wrong Scan Again`,
    //                 visibilityTime: 3000,
    //                 props: {
    //                     text1NumberOfLines: 2 //number of how many lines you want
    //                 }
    //             });
    //         });
    // };

    const handlePress = () => {
        if (data) {
            navigation.navigate("Walletscreen")
        }
        iAMSmartCall()
    }

    useEffect(() => {
        if (Object.keys(imsmartData).length > 0) {
            setData(true)
            const date = imsmartData?.birthDate
            const newdate = `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`
            setBirthdate(newdate)
        } else {
            setData(false)
        }

    }, [imsmartData])

    return (
        <Theambackground title={"Wallet"}
            subtitle={`${STR.WALLET.WELCOME}${Object.keys(profileData).length > 0
                ? ` ${profileData.firstname}`
                : 'User Name'}`}
            setting={true}
            scan={true}
            radius={false}>
            <View style={{ flex: 1, height: "100%", padding: 25, marginBottom: 90 }}>
                <View style={{ marginTop: 15 }}>
                    <PoppinsText title={"English Name"}
                        textstyle={styles.name} />
                    <View style={styles.inputcontiner}>
                        <View style={{ ...styles.inputview, backgroundColor: data ? COLOR.GRAY[900] : COLOR.WHITE[100] }}>
                            <Text style={styles.textstyle}>{Object.keys(imsmartData).length > 0
                                ? `${imsmartData?.enName?.UnstructuredName}`
                                : 'User'}</Text>
                        </View>
                        {data &&
                            <Image source={IMG.ISMART}
                                style={styles.imgstyle} />
                        }
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <PoppinsText title={"Chinese Name"}
                        textstyle={styles.name} />
                    <View style={styles.inputcontiner}>
                        <View style={{ ...styles.inputview, backgroundColor: data ? COLOR.GRAY[900] : COLOR.WHITE[100] }}>
                            <Text style={styles.textstyle}>{Object.keys(imsmartData).length > 0
                                ? `${imsmartData?.enName?.UnstructuredName}`
                                : 'User'}</Text>
                        </View>
                        {data &&
                            <Image source={IMG.ISMART}
                                style={styles.imgstyle} />
                        }
                    </View>
                </View>

                <View style={{ marginTop: 15 }}>
                    <PoppinsText title={"Hong Kong Identity Card number"}
                        textstyle={styles.name} />
                    <View style={styles.inputcontiner}>
                        <View style={{ ...styles.inputview, backgroundColor: data ? COLOR.GRAY[900] : COLOR.WHITE[100] }}>
                            <Text style={styles.textstyle}>{Object.keys(imsmartData).length > 0
                                ? `(${imsmartData?.idNo?.CheckDigit}) - ${imsmartData?.idNo?.Identification}`
                                : 'User'}</Text>
                        </View>
                        {data &&
                            <Image source={IMG.ISMART}
                                style={styles.imgstyle} />
                        }
                    </View>
                </View>

                <View style={{ marginTop: 15 }}>
                    <PoppinsText title={"Sex"}
                        textstyle={styles.name} />
                    <View style={styles.inputcontiner}>
                        <View style={{ ...styles.inputview, backgroundColor: data ? COLOR.GRAY[900] : COLOR.WHITE[100] }}>
                            <Text style={styles.textstyle}>{Object.keys(imsmartData).length > 0
                                ? `${imsmartData?.gender}`
                                : 'User'}</Text>
                        </View>
                        {data &&
                            <Image source={IMG.ISMART}
                                style={styles.imgstyle} />
                        }
                    </View>
                </View>

                <View style={{ marginTop: 15 }}>
                    <PoppinsText title={"Date of Birth"}
                        textstyle={styles.name} />
                    <View style={styles.inputcontiner}>
                        <View style={{ ...styles.inputview, justifyContent: "space-between", alignItems: "center", flexDirection: "row", backgroundColor: data ? COLOR.GRAY[900] : COLOR.WHITE[100] }}>

                            <Text style={styles.textstyle}>{Object.keys(imsmartData).length > 0
                                ? birthdate
                                : 'User'}</Text>
                            <Icon name='md-calendar-sharp'
                                type='ionicon' />
                        </View>
                        {data &&
                            <Image source={IMG.ISMART}
                                style={styles.imgstyle} />
                        }
                    </View>
                </View>

                {data &&
                    <View style={styles.msgview} onPress={() => console.log("Under Production")}>

                        <Image source={IMG.IMSMART_2}
                            style={styles.imsmartimg} />

                        <PoppinsText title={"Data id provided by “iAM Smart”"}
                            textstyle={styles.msgtext} />

                    </View>
                }

                <TouchableOpacity style={styles.btnstyle} onPress={() => handlePress()}>
                    {data &&
                        <PoppinsText title={"Next"}
                            textstyle={styles.personaltext} />
                    }
                    {!data &&
                        <Image source={IMG.IMSMART_2}
                            style={styles.imsmartimg} />
                    }
                    {!data &&
                        <PoppinsText title={"Personal data from iAM Smart"}
                            textstyle={styles.personaltext} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 8 }} onPress={() => console.log("Under Production")}>
                    <PoppinsText title={"more Info"}
                        textstyle={styles.moretext} />
                </TouchableOpacity>
            </View>

        </Theambackground>
    );
};

export default Userdetail;


const styles = StyleSheet.create({
    name: {
        fontSize: 16,
        color: COLOR.GRAY[800]
    },
    inputcontiner: {
        flexDirection: "row", marginTop: 10,
        alignItems: "center"
    },
    inputview: {
        width: "90%",
        borderWidth: 1,
        height: 34,
        borderRadius: 5,

        justifyContent: "center",
        paddingHorizontal: 15
    },
    textstyle: {
        fontSize: 16,
        color: COLOR.GRAY[600]
    },
    imgstyle: {
        width: 25.1,
        height: 30,
        marginLeft: 15,

    },
    btnstyle: {
        backgroundColor: COLOR.GREEN[200],
        marginTop: 15,
        height: 44,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    moretext: {
        fontSize: 15,
        fontWeight: "600",
        color: COLOR.BLUE[700]
    },
    imsmartimg: {
        width: 22,
        height: 26
    },
    personaltext: {
        fontSize: 16,
        fontWeight: "500",
        color: COLOR.WHITE[100],
        marginLeft: 8
    },
    msgview: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginTop: 15,
        alignItems: "center"

    },
    msgtext: {
        fontSize: 16,
        marginLeft: 10,
        color: COLOR.GRAY[400]
    }

})