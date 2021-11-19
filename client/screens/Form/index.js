import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ToastAndroid } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import RNModal from 'react-native-modal';
import axios from 'axios';

export default function Form() {
  const formValidationSchema = yup.object().shape({
    property: yup.string().required('Property is required'),
    bedroom: yup.string().required('Bedroom is required'),
    address: yup.string().required('Address is required'),
    pickDate: yup.date().required('Date is required'),
    rentalPrice: yup
      .number()
      .integer()
      .moreThan(0, 'Rental Price must be greater than 0')
      .required('Rent price is required'),
    note: yup.string().max(200, 'Note only contain 200 characters!'),
    reporterName: yup.string().required('Reporter Name is required'),
  });

  const initialValues = {
    property: '',
    bedroom: '',
    address: '',
    pickDate: new Date(),
    rentalPrice: '',
    note: '',
    furniture: '',
    reporterName: '',
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [confirmData, setConfirmData] = useState({});

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressConfirm = (data) => {
    setModalVisible(!isModalVisible);
    setConfirmData(data);
  };

  const onPressSubmit = async (resetForm) => {
    try {
      const response = await axios.post(
        'http://192.168.101.9:5000/rentalz/createForm',
        confirmData
      );
      console.log(response);
      ToastAndroid.showWithGravityAndOffset(
        response.data.message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        10,
        110
      );
      if (response.data.message === 'Form created!') {
        setModalVisible(!isModalVisible);
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formHeader}>RentalZ Form</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        onSubmit={onPressConfirm}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          resetForm,
        }) => (
          <>
            <ScrollView>
              <View style={styles.formBody}>
                <View style={styles.pickerContainer}>
                  <Text style={styles.textStyle}>Property</Text>
                  <View style={styles.pickerStyle}>
                    <Picker
                      selectedValue={values.property}
                      onValueChange={handleChange('property')}
                    >
                      <Picker.Item
                        label="Choose Property..."
                        value=""
                        enabled={false}
                      />
                      <Picker.Item label="Flat" value="Flat" />
                      <Picker.Item label="House" value="House" />
                      <Picker.Item label="Bungalow" value="Bungalow" />
                    </Picker>
                  </View>
                  {errors.property && touched.property ? (
                    <Text style={{ color: 'red', fontSize: 14 }}>
                      {errors.property}
                    </Text>
                  ) : null}

                  <Text style={styles.textStyle}>Bedroom</Text>
                  <View style={styles.pickerStyle}>
                    <Picker
                      selectedValue={values.bedroom}
                      onValueChange={handleChange('bedroom')}
                    >
                      <Picker.Item
                        label="Choose Bedroom..."
                        value=""
                        enabled={false}
                      />
                      <Picker.Item label="One" value="One" />
                      <Picker.Item label="Two" value="Two" />
                      <Picker.Item label="Studio" value="Studio" />
                    </Picker>
                  </View>
                  {errors.bedroom && touched.bedroom ? (
                    <Text style={{ color: 'red', fontSize: 14 }}>
                      {errors.bedroom}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.datepickerContainer}>
                  <Text style={styles.textStyle}>Pick a date</Text>
                  <View style={styles.datepickerStyle}>
                    <Input
                      disabled
                      inputContainerStyle={{
                        borderBottomWidth: 0,
                        marginBottom: -27,
                      }}
                      inputStyle={{ paddingHorizontal: 2 }}
                      value={moment(values.pickDate).format('DD.MM.YYYY')}
                      leftIcon={
                        <Icon
                          name="calendar"
                          size={20}
                          color="black"
                          onPress={() => {
                            setDatePickerVisibility(true);
                          }}
                        />
                      }
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={(value) => {
                        setFieldValue('pickDate', new Date(value));
                        setDatePickerVisibility(false);
                      }}
                      onCancel={() => {
                        setDatePickerVisibility(false);
                      }}
                      maximumDate={new Date()}
                    />
                  </View>
                </View>

                <View style={styles.pickerContainer}>
                  <Text style={styles.textStyle}>Furniture</Text>
                  <View style={styles.pickerStyle}>
                    <Picker
                      selectedValue={values.furniture}
                      onValueChange={handleChange('furniture')}
                    >
                      <Picker.Item
                        label="Choose Furniture..."
                        value=""
                        enabled={false}
                      />
                      <Picker.Item label="Furnished" value="Furnished" />
                      <Picker.Item label="Unfurnished" value="Unfurnished" />
                      <Picker.Item
                        label="Part Furnished"
                        value="Part Furnished"
                      />
                    </Picker>
                  </View>
                </View>

                <Input
                  label="Address"
                  onChangeText={handleChange('address')}
                  value={values.address}
                  errorMessage={errors.address}
                  errorStyle={{ fontSize: 14 }}
                  leftIcon={<Icon name="home" size={20} color="#86939E" />}
                />

                <Input
                  label="Rental Price"
                  onChangeText={handleChange('rentalPrice')}
                  value={values.rentalPrice}
                  errorMessage={errors.rentalPrice}
                  errorStyle={{ fontSize: 14 }}
                  keyboardType="numeric"
                  leftIcon={<Icon name="dollar" size={20} color="#86939E" />}
                />

                <Input
                  label="Note"
                  onChangeText={handleChange('note')}
                  value={values.note}
                  errorMessage={errors.note}
                  errorStyle={{ fontSize: 14 }}
                />

                <Input
                  label="Reporter Name"
                  onChangeText={handleChange('reporterName')}
                  value={values.reporterName}
                  errorMessage={errors.reporterName}
                  errorStyle={{ fontSize: 14 }}
                  leftIcon={<Icon name="user" size={20} color="#86939E" />}
                />
              </View>
              <View style={styles.buttonSubmit}>
                <Button onPress={handleSubmit} title="Submit" />
              </View>
              <RNModal isVisible={isModalVisible} style={{ margin: 50 }}>
                <View style={styles.modalView}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>Confirmation?</Text>
                  </View>
                  <Text style={styles.modalTextStyle}>
                    Property: {values.property}
                  </Text>
                  <Text style={styles.modalTextStyle}>
                    Bedroom: {values.bedroom}
                  </Text>
                  <Text style={styles.modalTextStyle}>
                    Pick a date: {moment(values.pickDate).format('DD.MM.YYYY')}
                  </Text>
                  <Text style={styles.modalTextStyle}>
                    Furniture: {values.furniture}
                  </Text>
                  <Text style={styles.modalTextStyle}>
                    Address: {values.address}
                  </Text>
                  <Text style={styles.modalTextStyle}>
                    Rental Price: {'$'}
                    {values.rentalPrice}
                  </Text>
                  <Text style={styles.modalTextStyle}>Note: {values.note}</Text>
                  <Text style={styles.modalTextStyle}>
                    Reporter Name: {values.reporterName}
                  </Text>
                  <View style={styles.modalButton}>
                    <Button
                      buttonStyle={styles.buttonCancel}
                      onPress={toggleModal}
                      title="Cancel"
                    />
                    <Button
                      buttonStyle={styles.buttonConfirm}
                      onPress={() => onPressSubmit(resetForm)}
                      title="Submit"
                    />
                  </View>
                </View>
              </RNModal>
            </ScrollView>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    height: '100%',
  },
  textStyle: {
    color: '#86939E',
    fontWeight: 'bold',
    fontSize: 17,
    paddingTop: 6,
  },
  formHeader: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  formBody: {},
  pickerStyle: {
    padding: 8,
    width: 375,
    marginTop: 8,
    borderColor: '#86939E',
    borderWidth: 1.5,
    borderRadius: 5,
    paddingBottom: 10,
    backgroundColor: '#ededed',
  },
  pickerContainer: {
    paddingHorizontal: 10,
  },
  datepickerContainer: {
    paddingHorizontal: 10,
  },
  datepickerStyle: {
    width: 375,
    marginTop: 8,
    borderColor: '#86939E',
    borderWidth: 1.5,
    borderRadius: 5,
  },
  buttonSubmit: {
    paddingHorizontal: 10,
    marginTop: 2,
  },
  modalView: {
    flex: 1,
    maxHeight: '70%',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 7,
    paddingTop: 10,
  },
  modalButton: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: 20,
  },
  buttonCancel: {
    backgroundColor: 'red',
    borderRadius: 20,
    marginTop: 10,
    width: 120,
  },
  buttonConfirm: {
    backgroundColor: 'green',
    borderRadius: 20,
    marginTop: 10,
    width: 120,
  },
  modalTextStyle: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
