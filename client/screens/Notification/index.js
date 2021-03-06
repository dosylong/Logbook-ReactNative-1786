import React, { useState } from 'react';
import { StyleSheet, View, ToastAndroid, Vibration, Text } from 'react-native';
import RNModal from 'react-native-modal';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';

export default function Notification() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressRingBell = async () => {
    const { sound } = await Audio.Sound.createAsync(require('./sound.mp3'));
    console.log('Playing Bell Sound');
    await sound.playAsync();
    ToastAndroid.showWithGravityAndOffset(
      'Ringing bell !',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      10,
      110
    );
  };

  const onPressVibrate = () => {
    Vibration.vibrate(1000);
    ToastAndroid.showWithGravityAndOffset(
      'Vibrated!',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      10,
      110
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}> Logbook 1 Notification API </Text>
      <Button
        buttonStyle={{
          backgroundColor: 'green',
          borderRadius: 20,
          width: 125,
        }}
        titleStyle={{ fontSize: 18 }}
        title="Press me"
        onPress={toggleModal}
      />
      <RNModal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalView}>
          <View style={styles.modalButton}>
            <Button
              buttonStyle={{
                backgroundColor: 'green',
                borderRadius: 20,
                width: 120,
              }}
              icon={<Icon name="bell" size={15} color="white" />}
              title=" Ring a bell"
              onPress={onPressRingBell}
            />
            <Button
              buttonStyle={{
                backgroundColor: 'green',
                borderRadius: 20,
                width: 125,
              }}
              icon={<Icon name="vibrate" size={18} color="white" />}
              title=" Vibrate"
              onPress={onPressVibrate}
            />
          </View>
          <Button
            titleStyle={{
              color: 'black',
            }}
            type="clear"
            title="Cancel"
            onPress={toggleModal}
          />
        </View>
      </RNModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  modalView: {
    justifyContent: 'center',
    flex: 1,
    maxHeight: '30%',
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 25,
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  pressMe: {
    backgroundColor: 'green',
  },
});
