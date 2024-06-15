import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {width} from './dimension';

const ProfileModal = ({
  isModalVisible,
  setisModalVisible,
  openCamera,
  openGallery,
  deletePhoto,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setisModalVisible(false)}
      onSwipeComplete={() => setisModalVisible(false)}
      swipeDirection="down"
      animationIn={'zoomInDown'}
      animationOut={'zoomOutDown'}
      animationOutTiming={800}
      animationInTiming={800}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.line}></View>
        <Text style={styles.mainText}>Profile photo</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
          }}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              setisModalVisible(false);
              openCamera();
            }}>
            <Icon
              name="camera"
              size={width / 12}
              color={'rgba(0, 100, 0, 0.96)'}
              style={{
                borderRadius: 100,
                borderWidth: 0.3,
                padding: width / 26,
                alignContent: 'center',
              }}
            />
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}
          onPress={() => {
            setisModalVisible(false);
            openGallery();
          }}
          >
            <Icon
              name="image"
              size={width / 13}
              color={'rgba(0, 100, 0, 0.96)'}
              style={{
                borderRadius: 100,
                borderWidth: 0.3,
                padding: width / 26,
                alignContent: 'center',
              }}
            />

            <Text style={styles.optionText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              setisModalVisible(false);
              deletePhoto();
            }}>
            <Icon
              name="delete"
              size={width / 13}
              color={'rgba(0, 100, 0, 0.96)'}
              style={{
                borderRadius: 100,
                borderWidth: 0.3,
                padding: width / 26,
                alignContent: 'center',
              }}
            />

            <Text style={[styles.optionText, styles.cancelText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
  },
  optionButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    gap: width / 25,
    borderBottomWidth: 0,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: width / 25,
    textAlign: 'center',
    fontFamily: 'Nunito-Medium',
    color: 'rgba(0,0,0,0.8)',
  },
  cancelText: {
    color: 'red',
  },
  line: {
    width: width / 9,
    height: width / 80,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  mainText: {
    fontSize: width / 19,
    fontFamily: 'Nunito-Bold',
    color: 'rgba(0,0,0,0.8)',
    marginVertical: width / 30,
    alignSelf: 'flex-start',
  },
});
