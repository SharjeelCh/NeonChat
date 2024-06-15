import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

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
