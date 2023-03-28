import { Card } from '@rneui/base';
import React from 'react'
import { View, Text } from 'react-native'
import { color } from 'react-native-reanimated';
import Theambackground from '../../Components/Theambackground';
import { COLOR } from '../../Constant/color';

const Cardinfo = (params) => {
    const Data = params?.route?.params?.data?.data
    console.log("PArams ===>", Object.entries(Data));
    return (
        <Theambackground
        // title="Settings"
        // subtitle="Manage your wallet security settings"
        // scan={true}
        // setting={false}
        // back={true}
        >
            <View>
                {Object.entries(Data).map((item, i) => {
                    const value = item[1]
                    const typeofvalue = typeof value
                    console.log("WWWW", value);
                    if (item[0] == "@context" || item[0] == "credentialSchema" || item[0] == "issuer") {
                        return null
                    } else {
                        return (
                            <View style={{ padding: 12, flexDirection: typeofvalue == "string" ? "row" : "column" }}>
                                <Text style={{ fontSize: 20, color: COLOR.BLUE[300], fontWeight: "bold", textTransform: "capitalize" }}>{item[0]} :</Text>


                                {typeofvalue == "string" ? (
                                    <View style={{ alignItems: "flex-start", marginLeft: 15 }}>
                                        <Text style={{ fontSize: 16, color: "black", }}>{value}</Text>
                                    </View>
                                ) : (
                                    <View style={{ alignItems: "center", flex: 1 }}>
                                        {Object.entries(value).map((val, i) => {
                                            return (
                                                <View style={{ flexDirection: "row", width: "100%", alignItems: "center", marginBottom: 2, marginTop: 5, }}>
                                                    <Text style={{ fontSize: 18, fontWeight: "600", textTransform: "capitalize", color: "black", alignSelf: "flex-start" }}>{val[0]} : </Text>
                                                    <Text style={{ fontSize: 16, color: "black" }}>{val[1]}</Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                )}
                            </View>
                        )

                    }

                })}
            </View>
        </Theambackground>
    );
}

export default Cardinfo