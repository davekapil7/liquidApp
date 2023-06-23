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

const Credentials = () => {

    const profileData = useSelector(state => state?.appstate?.profileData);
    const [created, setCreated] = useState(false);

    const [companyname, setCompanyname] = useState('')
    const [number, setNumber] = useState('')
    const [modalshow, setModal] = useState(false)
    const [numbererror, setNumbererror] = useState(false)

    // if (loader) {
    //     return (
    //         <View style={{ width: '100 %', height: '100%' }}>
    //             <ActivityIndicator size="large" color="#00ff00" />
    //         </View>
    //     )
    // }

    const credentialFunc = async () => {
        const isIamSmartCreated = await AsyncStorage.getItem('isIamSmartCreated');
        let creation = false;
        if (isIamSmartCreated == 'true') {
            creation = true;
        }
        setCreated(creation);
    }

    useEffect(() => {
        credentialFunc();
    }, [])

    const offerTemplate = () => {
        if (Object.keys(profileData).length == 0) {
            Alert.alert('Please fetch your profile data to create iAM Smart Credential');
        } else {

            axiosInstance
                .get('template/fetchAllofferedTemplate')
                .then(function (responseJson) {
                    if (responseJson.status === 200) {
                        console.log("Template for all the DIDs", responseJson.data.data);
                        let getDidList = responseJson.data.data;
                        let selected;
                        for (let i = 0; i < getDidList.length; i++) {
                            let did = getDidList[i].templateId;
                            if (did.toUpperCase().includes('IAMSMART')) {
                                selected = did;
                            }
                        }
                        console.log("Selected template ", selected);
                        smartCredential(selected);
                    }
                })
                .catch(error => {
                    //Hide Loader
                    console.error(error);

                    Toast.show({
                        topOffset: 100,
                        type: "error",
                        text1: "ERROR",
                        text2: `Template couldn't be fetched`,
                        visibilityTime: 3000,
                        props: {
                            text1NumberOfLines: 2 //number of how many lines you want
                        }
                    });
                });
        }
    }

    const smartCredential = (template) => {

        let dataToSend = {
            data: {
                birthDate: profileData.birthDate,
                businessID: profileData.businessID,
                enName_UnstructuredName: profileData?.enName?.UnstructuredName,
                gender: profileData.gender,
                idNo_CheckDigit: profileData.idNo.CheckDigit,
                idNo_Identification: profileData.idNo.Identification,
            },
            email: profileData.emailAddr,
            templateId: template,
            extra: {

            },
            isVerificationRequired: false
        }

        console.log("Data to send ", dataToSend);

        axiosInstance
            .post('api/issue-credentials-using-template', dataToSend)
            .then(function (responseJson) {
                if (responseJson.status === 200) {
                    console.log("I am smart credential created ", responseJson.data);
                    getCarddata();
                    AsyncStorage.setItem('isIamSmartCreated', 'true');
                    setCreated(true);
                }
            })
            .catch(error => {
                //Hide Loader
                console.error(error);
                // Toast.show("Credential couldn't be created", Toast.LONG, {
                //     backgroundColor: 'red',
                // });
                Toast.show({
                    topOffset: 100,
                    type: "error",
                    text1: "ERROR",
                    text2: `Credential couldn't be created`,
                    visibilityTime: 3000,
                    props: {
                        text1NumberOfLines: 2 //number of how many lines you want
                    }
                });
            });
    }

    const checklength = () => {
        const length = number.length

        if (length >= 7) {
            setNumbererror(false)
        } else {
            setNumbererror(true)
        }
    }

    const createcompany = async () => {
        console.log("HEllo");
        // let companyname = "minal6998@gmail.com"
        // let number = 12345678
        const res = await createcompanyrequest(companyname, number)

        if (res.status === 200) {
            setModal(true)
        }
    }

    return (
        <Theambackground title={STR.CREDENTIAL.CREDENTIAL}
            subtitle={STR.CREDENTIAL.COMPANY_CREDENTIAL}
            radius={false}
            setting={true}
            scan={true}
            scroll={false}>
            <View style={{ flex: 1, margin: 25 }}>
                <PoppinsText title={STR.CREDENTIAL.CREATE_CASE}
                    textstyle={styles.title}
                />

                <PoppinsText title={STR.CREDENTIAL.SEARCH_COMPANY}
                    textstyle={styles.serchtext} />

                <PoppinsText title={STR.CREDENTIAL.COMPANY_NAME}
                    textstyle={styles.textinputtitle} />

                <TextInput placeholder={STR.CREDENTIAL.COMPANY_PLACEHOLDER}
                    placeholderTextColor={COLOR.GRAY[600]}
                    style={styles.inputview}
                    value={companyname}
                    onChangeText={(val) => setCompanyname(val)} />

                <PoppinsText title={STR.CREDENTIAL.CRETIFICATE_NUMBE}
                    textstyle={styles.textinputtitle} />

                <TextInput placeholder={STR.CREDENTIAL.NUMBER_PLACEHOLDER}
                    placeholderTextColor={COLOR.GRAY[600]}
                    style={styles.inputview}
                    value={number}
                    keyboardType='numeric'
                    onChangeText={(val) => setNumber(val)}
                    onEndEditing={() => checklength()} />
                {numbererror &&
                    <PoppinsText title={"*Number should be 7 digit"}
                        textstyle={styles.validationtext} />
                }

                <LAButton viewStyle={styles.button}
                    title={STR.BUTTON.SEARCH_COMPANY}
                    handlepress={() => createcompany()} />


                <View style={{}}>
                    <Modal visible={modalshow} style={styles.modalstyle} transparent={true}>
                        <View style={styles.modalcontainer}>
                            <View style={styles.modalview}>
                                <PoppinsText title={STR.CREDENTIAL.MODAL_TEXT}
                                    textstyle={styles.modaltext} />
                                <LAButton title={STR.BUTTON.OK} handlepress={() => setModal(false)} />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </Theambackground>
        // <View
        //     style={{
        //         height: '100%',
        //         width: '100%',
        //         alignItems: 'center',
        //     }}>
        //     <View style={{ marginLeft: 5 }}>
        //         <View style={{ marginTop: '10%' }}>
        //             <Text style={styles.title} >iAM SMART Profile Credential</Text>
        //         </View>
        //         <View style={{ marginTop: 20 }}>
        //             <Text style={styles.subtitle} >Make sure your IamSmart profile data is accurate and create your credentials</Text>
        //         </View>
        //         <TouchableOpacity activeOpacity={created ? 0 : 1} disabled={created && (Object.keys(profileData).length == 0)} onPress={() => offerTemplate()} style={[created ? styles.disabledBtnContainer : styles.btnContainer]} >
        //             <Text style={styles.btnText} >CREATE CREDENTIAL</Text>
        //         </TouchableOpacity>
        //     </View>
        //     {created && <View style={{ marginTop: '10%', alignItems: 'center' }}>
        //         <Text style={{ ...styles.title, color: '#454545' }} >Your iAM Smart credential is already created !</Text>
        //     </View>}
        //     {Object.keys(profileData).length == 0 && <View style={{ marginTop: '10%', alignItems: 'center' }}>
        //         <Text style={{ ...styles.title, color: '#454545' }} >You need to get Profile data from iAM Smart !</Text>
        //     </View>}
        // </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: "700"
    },
    serchtext: {
        fontSize: 15,
        marginTop: 8
    },

    textinputtitle: {
        fontSize: 15,
        marginTop: 20
    },
    inputview: {
        marginTop: 10,
        width: "100%",
        borderWidth: 1,
        borderRadius: 6,
        height: 34,
        paddingHorizontal: 15,
        fontSize: 15

    },
    button: {
        width: 209,
        position: "absolute",
        bottom: 140, alignSelf: "center",
        height: 30
    },
    // modalstyle: {
    //     width: "100%",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     height: "100%",
    //     backgroundColor: "red",
    //     marginTop: 150
    // },
    modalcontainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    modalview: {
        marginTop: 50,
        height: 242,
        width: "80%",
        backgroundColor: COLOR.BLUE[600],
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 25
    },
    modaltext: {
        fontSize: 19, textAlign: "center"
    },
    validationtext: {
        color: COLOR.RED[100],
        marginTop: 5,
        marginHorizontal: 15
    }

    // title: {
    //     color: '#000',
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     textAlign: 'center'
    // },
    // subtitle: {
    //     color: '#000',
    //     fontSize: 16,
    // },
    // btnText: {
    //     color: '#fff',
    //     fontSize: 16,
    // },
    // btnContainer: {
    //     marginTop: '20%',
    //     width: 220,
    //     height: 50,
    //     backgroundColor: '#324FC4',
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: 25
    // },
    // disabledBtnContainer: {
    //     marginTop: '20%',
    //     width: 220,
    //     height: 50,
    //     backgroundColor: '#808080',
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: 25
    // }
});


export default Credentials;
