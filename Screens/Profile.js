import React, {useEffect, useState} from 'react';
import {View, Button, Image, Platform} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

import {useRoute} from '@react-navigation/native';

const Profile = () => {
  const [imageUri, setImageUri] = useState(null);
  const route = useRoute();

  const handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'default',
      },
    };

    ImagePicker.launchCamera(options, response => {
      response.assets.forEach(asset => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: asset.uri};
          setImageUri(source.uri);
          console.log(route.params?.id);
        }
      });
      /*
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        setImageUri(source.uri);
        console.log(source.uri)
      }
      */
    });
  };
useEffect(()=>{
console.log("id: ",route.params)
},[])
  const handleSavePhoto = () => {
    const userId = uuid.v4();
    // You can store the image URI in the Firebase database
    firestore()
      .collection('users')
      .where('userId', '==', route.params?.id)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot)
        querySnapshot.forEach(doc => {
          doc.ref.update({
            profileImage: imageUri,
          });
        });
      })
      .catch(error => {
        console.error('Error saving data: ', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      {imageUri && (
        <Image source={{uri: imageUri}} style={{width: 200, height: 200}} />
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      <Button
        title="Save Photo"
        onPress={handleSavePhoto}
        disabled={!imageUri}
      />
      <Image source={{uri: imageUri}} style={{width: 200, height: 200}} />
    </View>
  );
};

export default Profile;
