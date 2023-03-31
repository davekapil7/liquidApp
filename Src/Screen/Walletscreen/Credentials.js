import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import axiosInstance from '../../Constant/axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Credentials = () => {

    const profileData = useSelector(state => state?.appstate?.profileData);
    const [created, setCreated] = useState(false);

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
                    Toast.show("Template couldn't be fetched", Toast.LONG, {
                        backgroundColor: 'red',
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
                    setCreated(true);
                }
            })
            .catch(error => {
                //Hide Loader
                console.error(error);
                Toast.show("Credential couldn't be created", Toast.LONG, {
                    backgroundColor: 'red',
                });
            });
    }

    return (
        <View
            style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
            }}>
            <View style={{ marginLeft: 5 }}>
                <View style={{ marginTop: '10%' }}>
                    <Text style={styles.title} >iAM SMART Profile Credential</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.subtitle} >Make sure your IamSmart profile data is accurate and create your credentials</Text>
                </View>
                <TouchableOpacity activeOpacity={created ? 0 : 1} disabled={created && (Object.keys(profileData).length == 0)} onPress={() => offerTemplate()} style={[created ? styles.disabledBtnContainer : styles.btnContainer]} >
                    <Text style={styles.btnText} >CREATE CREDENTIAL</Text>
                </TouchableOpacity>
            </View>
            {created && <View style={{ marginTop: '10%', alignItems: 'center' }}>
                <Text style={{ ...styles.title, color: '#454545' }} >Your iAM Smart credential is already created !</Text>
            </View>}
            {Object.keys(profileData).length == 0 && <View style={{ marginTop: '10%', alignItems: 'center' }}>
                <Text style={{ ...styles.title, color: '#454545' }} >You need to get Profile data from iAM Smart !</Text>
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        color: '#000',
        fontSize: 16,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
    },
    btnContainer: {
        marginTop: '20%',
        width: 220,
        height: 50,
        backgroundColor: '#324FC4',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    disabledBtnContainer: {
        marginTop: '20%',
        width: 220,
        height: 50,
        backgroundColor: '#808080',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    }
});


export default Credentials;
