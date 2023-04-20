import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLOR} from '../../Constant/color';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

const Editdetail = () => {
  
  const profileData = useSelector(state => state?.appstate?.profileData);
  const [firstname, setFirstName] = useState(Object.keys(profileData).length > 0 ? profileData?.firstname : '' );
  const [company, setCompany] = useState(Object.keys(profileData).length > 0 ? profileData?.company_name : '');
  const [lastname, setLastname] = useState(Object.keys(profileData).length > 0 ? profileData?.lastname : '');
  const [email, setEmail] = useState(Object.keys(profileData).length > 0 ? profileData?.email : '');

  const navigation = useNavigation()

  const selectimage = async () =>{
    ImagePicker.launchImageLibrary()
    // let options = {
    //   title: 'Select Image',
    //   customButtons: [
    //     {
    //       name: 'customOptionKey',
    //       title: 'Choose Photo from Custom Option'
    //     },
    //   ],
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };
    // ImagePicker.showImagePicker(options, (response) => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log(
    //       'User tapped custom button: ',
    //       response.customButton
    //     );
    //     alert(response.customButton);
    //   } else {
    //     let source = response;
    //     // You can also display the image using data:
    //     // let source = {
    //     //   uri: 'data:image/jpeg;base64,' + response.data
    //     // };
    //     setFilePath(source);
    //   }
    // });
  }
  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          padding: 15,
          backgroundColor: COLOR.WHITE[100],
        }}>
        <ScrollView style={{flex: 1, height: '100%'}}>
          <View style={{flex: 1}}>
            <Text
              style={{fontSize: 30, color: COLOR.BLUE[300], fontWeight: '600'}}>
              Edit Particulars
            </Text>
            <Text
              style={{fontSize: 18, marginTop: 10, color: COLOR.BLACK[100]}}>
              Fill in the following information for your contact card
            </Text>

            {/* Personal detail */}
            <View style={{marginTop: 15}}>
              {/* <View style={styles.lineView}></View> */}

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>First NAME</Text>
                <TextInput
                  value={firstname}
                  onChangeText={text => setFirstName(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>Last Name</Text>
                <TextInput
                  value={lastname}
                  onChangeText={text => setLastname(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>Email Address</Text>
                <TextInput
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={styles.inputtext}
                />
              </View>
              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>Your Company Name</Text>
                <TextInput
                  value={company}
                  onChangeText={text => setCompany(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>Your Company Logo</Text>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    borderColor: COLOR.BLUE[300],
                    height: 65,
                    marginTop: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }} onPress={() => selectimage()}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLOR.BLUE[300],
                      fontWeight: '700',
                    }}>
                    SELECT IMAGE
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View style={styles.linetextView}>
                <Text style={styles.lineText}>PERSONAL DETAILS</Text>
              </View> */}
            </View>
            {/* COntact info */}
            {/* <View style={{marginTop: 15}}>
              <View style={styles.lineView}></View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>EMAIL ADDRESS</Text>
                <TextInput
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>CONTRY CODE</Text>
                <TextInput
                  value={country}
                  onChangeText={text => setCountry(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>PHONE NUMBER</Text>
                <TextInput
                  value={number}
                  onChangeText={text => setNumber(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.linetextView}>
                <Text style={styles.lineText}>CONTACT INFO</Text>
              </View>
            </View> */}
            {/* Social profile */}
            {/* <View style={{marginTop: 15}}>
              <View style={styles.lineView}></View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>LINKEDIN</Text>
                <TextInput
                  value={linkdin}
                  onChangeText={text => setLinkdin(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>FACEBOOK</Text>
                <TextInput
                  value={facebook}
                  onChangeText={text => setFacebook(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>INSTAGRAM</Text>
                <TextInput
                  value={instagram}
                  onChangeText={text => setInstagram(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>GITHUB</Text>
                <TextInput
                  value={github}
                  onChangeText={text => setGithub(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>TWITTER</Text>
                <TextInput
                  value={twitter}
                  onChangeText={text => setTwitter(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>TIKTOK</Text>
                <TextInput
                  value={tiktok}
                  onChangeText={text => setTiktok(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.linetextView}>
                <Text style={styles.lineText}>SOCIAL PROFILES</Text>
              </View>
            </View> */}

            <TouchableOpacity
              style={{
                width: '100%',
                height: 60,
                backgroundColor: COLOR.BLUE[300],
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginTop: 15,
              }}>
              <Text style={{fontSize:20,fontWeight:"700",color:"white"}}>SAVE DETAILS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '100%',
                height: 60,
                backgroundColor: "white",
                borderWidth:1,
                borderColor:COLOR.BLUE[300],
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginTop: 15,
              }}
              onPress={()=>navigation.goBack()}>
              <Text style={{fontSize:20,fontWeight:"700",color:COLOR.BLUE[300]}}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
    // <SafeAreaView style={{flex: 1, width: '100%'}}>
    //   <View
    //     style={{
    //       flex: 1,
    //       width: '100%',
    //       height: '100%',
    //       padding: 15,
    //       backgroundColor: COLOR.WHITE[100],
    //     }}>
    //     <ScrollView style={{flex: 1, height: '100%'}}>
    //       <View style={{flex: 1}}>
    //         <Text
    //           style={{fontSize: 30, color: COLOR.BLUE[300], fontWeight: '600'}}>
    //           Edit Particulars
    //         </Text>
    //         <Text
    //           style={{fontSize: 18, marginTop: 10, color: COLOR.BLACK[100]}}>
    //           Fill in the following information for your contact card
    //         </Text>

    //         {/* Personal detail */}
    //         <View style={{marginTop: 15}}>
    //           <View style={styles.lineView}></View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>FULL NAME</Text>
    //             <TextInput
    //               value={fullname}
    //               onChangeText={text => setFullname(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>COMPAY</Text>
    //             <TextInput
    //               value={company}
    //               onChangeText={text => setCompany(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>OCCUPATION</Text>
    //             <TextInput
    //               value={occupation}
    //               onChangeText={text => setOccupation(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>CARD PROFILE IMAGE</Text>
    //             <View
    //               style={{
    //                 width: '100%',
    //                 borderWidth: 1,
    //                 borderColor: COLOR.BLUE[300],
    //                 height: 65,
    //                 marginTop: 10,
    //                 borderRadius: 10,
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //               }}>
    //               <Text
    //                 style={{
    //                   fontSize: 20,
    //                   color: COLOR.BLUE[300],
    //                   fontWeight: '700',
    //                 }}>
    //                 SELECT IMAGE
    //               </Text>
    //             </View>
    //           </View>

    //           <View style={styles.linetextView}>
    //             <Text style={styles.lineText}>PERSONAL DETAILS</Text>
    //           </View>
    //         </View>
    //         {/* COntact info */}
    //         <View style={{marginTop: 15}}>
    //           <View style={styles.lineView}></View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>EMAIL ADDRESS</Text>
    //             <TextInput
    //               value={email}
    //               onChangeText={text => setEmail(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>CONTRY CODE</Text>
    //             <TextInput
    //               value={country}
    //               onChangeText={text => setCountry(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>PHONE NUMBER</Text>
    //             <TextInput
    //               value={number}
    //               onChangeText={text => setNumber(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.linetextView}>
    //             <Text style={styles.lineText}>CONTACT INFO</Text>
    //           </View>
    //         </View>
    //         {/* Social profile */}
    //         <View style={{marginTop: 15}}>
    //           <View style={styles.lineView}></View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>LINKEDIN</Text>
    //             <TextInput
    //               value={linkdin}
    //               onChangeText={text => setLinkdin(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>FACEBOOK</Text>
    //             <TextInput
    //               value={facebook}
    //               onChangeText={text => setFacebook(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>INSTAGRAM</Text>
    //             <TextInput
    //               value={instagram}
    //               onChangeText={text => setInstagram(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>GITHUB</Text>
    //             <TextInput
    //               value={github}
    //               onChangeText={text => setGithub(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>TWITTER</Text>
    //             <TextInput
    //               value={twitter}
    //               onChangeText={text => setTwitter(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.inputbox}>
    //             <Text style={styles.inputtitle}>TIKTOK</Text>
    //             <TextInput
    //               value={tiktok}
    //               onChangeText={text => setTiktok(text)}
    //               style={styles.inputtext}
    //             />
    //           </View>

    //           <View style={styles.linetextView}>
    //             <Text style={styles.lineText}>SOCIAL PROFILES</Text>
    //           </View>
    //         </View>

    //         <TouchableOpacity
    //           style={{
    //             width: '100%',
    //             height: 60,
    //             backgroundColor: COLOR.BLUE[300],
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             borderRadius: 10,
    //             marginTop: 15,
    //           }}>
    //           <Text style={{fontSize:20,fontWeight:"700",color:"white"}}>SAVE DETAILS</Text>
    //         </TouchableOpacity>

    //         <TouchableOpacity
    //           style={{
    //             width: '100%',
    //             height: 60,
    //             backgroundColor: "white",
    //             borderWidth:1,
    //             borderColor:COLOR.BLUE[300],
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             borderRadius: 10,
    //             marginTop: 15,
    //           }}
    //           onPress={()=>navigation.goBack()}>
    //           <Text style={{fontSize:20,fontWeight:"700",color:COLOR.BLUE[300]}}>CANCEL</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </ScrollView>
    //   </View>
    // </SafeAreaView>
  );
};

export default Editdetail;

const styles = StyleSheet.create({
  lineView: {
    // width: '100%',
    borderWidth: 0.2,
    marginTop: 15,
    borderColor: COLOR.BLUE[400],
    backgroundColor: COLOR.BLUE[400],
  },
  linetextView: {
    backgroundColor: 'white',

    position: 'absolute',
    marginTop: 5,
    paddingRight: 10,
  },
  lineText: {fontSize: 15, color: COLOR.BLUE[300]},

  inputbox: {
    width: '100%',
    borderRadius: 10,
    minHeight: 85,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLOR.BLUE[400],
    padding: 15,
  },
  inputtitle: {
    fontSize: 15,
    color: COLOR.GRAY[100],
    fontWeight: '700',
  },
  inputtext: {color: 'black', fontSize: 22},
});
