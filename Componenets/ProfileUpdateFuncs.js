import { deleteObject, ref } from 'firebase/storage';
import { Alert, Platform, ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';


export const updateUserName = (id, newUsername) => {
  firestore()
    .collection('users')
    .where('userId', '==', id)
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot);
      querySnapshot.forEach(doc => {
        doc.ref.update({
          username: newUsername,
        });
      });
      ToastAndroid.show('Username Updated', ToastAndroid.SHORT);
    })
    .catch(error => {
      console.error('Error saving data: ', error);
    });
};
export const updateEmailName = (id, newemail) => {
  firestore()
    .collection('users')
    .where('userId', '==', id)
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot);
      if (!isGmail(newemail)) {
        ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
        return;
      } else {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            email: newemail,
          });
        });
        ToastAndroid.show('Email Updated', ToastAndroid.SHORT);
      }
    })
    .catch(error => {
      console.error('Error saving data: ', error);
    });
};

export const AboutMe = (id, about) => {
  firestore()
    .collection('users')
    .where('userId', '==', id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.update({
          aboutme: about,
        });
      });
      ToastAndroid.show('About Me Updated', ToastAndroid.SHORT);
    })
    .catch(error => {
      console.error('Error saving data: ', error);
    });
};

const isGmail = email => {
  const gmailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
  return gmailRegex.test(email);
};

export const getProfileImage = (id, setCurrentImage) => {
  firestore()
    .collection('users')
    .where('userId', '==', id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        setCurrentImage(doc.data().profileImage);
      });
    })
    .catch(error => {
      console.error('Error saving data: ', error);
    });
};



export const deletePhoto = async (userId, setCurrentImage) => {
  try {
    // Reference to the user document in Firestore
    const userRef = firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error('User document not found!');
      return;
    }

    const userData = userDoc.data();
    const imageUrl = userData.profileImage;

    const imageRef = storage().refFromURL(imageUrl);

    await imageRef.delete();
    console.log('Profile image deleted from storage.');

    await userRef.update({
      profileImage: firestore.FieldValue.delete(),
    });
    console.log('Profile image URL removed from Firestore.');

    setCurrentImage(null);
    ToastAndroid.show('Profile Image Deleted', ToastAndroid.SHORT);

  } catch (error) {
    console.error('Error deleting photo: ', error);
    Alert.alert('Error', 'Failed to delete image');
  }
};

export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    return result === RESULTS.GRANTED;
  } else if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.CAMERA);
    return result === RESULTS.GRANTED;
  }
  return false;
};

export const openGallery = async (setCurrentImage,showTick,setImageUri)=>{
  
    try {
      const result = await launchImageLibrary();

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Alert.alert('Error', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        console.log(result.assets);
        const uri = result.assets[0].uri;
        if (uri) {
          console.log(uri);
          setCurrentImage(uri);
          setImageUri(uri);
          showTick(true);
        }
      }
    } catch (error) {
      console.log('Error launching camera: ', error);
      Alert.alert('Error', 'Failed to launch gallery');
    }
}