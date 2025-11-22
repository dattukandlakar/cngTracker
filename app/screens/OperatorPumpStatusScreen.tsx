import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { scale, verticalScale, moderateScale, fontScale } from '../../utils/responsive';

type HomeStackParamList = {
  Home: undefined;
  PumpList: undefined;
  PumpDetails: { pumpId: string };
  Profile: undefined;
  UpdateProfile: undefined;
  AddPump: undefined;
  OperatorPumpStatus: undefined;
};

type Props = NativeStackScreenProps<HomeStackParamList, 'OperatorPumpStatus'>;

export function OperatorPumpStatusScreen({ navigation }: Props) {
  const [status, setStatus] = useState('available');
  const [open, setOpen] = useState(false);

  const selectStatus = (value: string) => {
    setStatus(value);
    setOpen(false);
  };

  const handleUpdateStatus = () => {
    // Add your status update logic here
    console.log('Status updated to:', status);
    // You can add an alert or navigation here
  };

  const handleFindNearestPump = () => {
    navigation.navigate('PumpList');
  };

  return (
    <LinearGradient
      colors={['#0a3d62', '#067a5b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.title}>Pump Status Update</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.infoBox}>
              <View style={styles.row}>
                <Text style={styles.label}>Pump Name:</Text>
                <Text style={styles.value}>XYZ Pump</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Fuel Type:</Text>
                <Text style={styles.value}>CNG</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.value}>Pune</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Pump Status:</Text>
                <Text style={styles.value}>{status}</Text>
              </View>
            </View>

            <Text style={styles.label2}>Pump Status:</Text>

            <Pressable style={styles.dropdown} onPress={() => setOpen(true)}>
              <Text style={styles.dropdownText}>{status}</Text>
              <Text style={styles.dropdownIcon}>⌄</Text>
            </Pressable>

            <Pressable style={styles.buttonPrimary} onPress={handleUpdateStatus}>
              <Text style={styles.buttonText}>UPDATE STATUS</Text>
            </Pressable>

            <Pressable style={styles.buttonSecondary} onPress={handleFindNearestPump}>
              <Text style={styles.buttonText}>FIND NEAREST PUMP</Text>
            </Pressable>
          </View>
        </View>

        <Modal transparent visible={open} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => selectStatus('available')}
              >
                <Text style={styles.modalText}>available</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => selectStatus('no-stock')}
              >
                <Text style={styles.modalText}>no-stock</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => selectStatus('maintenance')}
              >
                <Text style={styles.modalText}>maintenance</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: moderateScale(20) },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(20),
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: fontScale(24),
    color: '#fff',
    fontWeight: '600',
  },
  placeholder: {
    width: moderateScale(40),
  },
  cardContainer: {
    marginTop: moderateScale(90),
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: moderateScale(22),
    padding: moderateScale(22),
  },
  title: {
    color: '#fff',
    fontSize: fontScale(26),
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  infoBox: {
    backgroundColor: 'rgba(0,0,0,0.32)',
    padding: moderateScale(18),
    borderRadius: moderateScale(18),
    marginBottom: moderateScale(25),
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: moderateScale(12) },
  label: { color: '#fff', fontSize: fontScale(15), fontWeight: '600' },
  value: { color: '#fff', fontSize: fontScale(15) },
  label2: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: moderateScale(8),
    fontSize: fontScale(15),
  },
  dropdown: {
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: moderateScale(14),
    padding: moderateScale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(18),
  },
  dropdownText: { color: '#fff', fontSize: fontScale(16) },
  dropdownIcon: { color: '#fff', fontSize: fontScale(18) },
  buttonPrimary: {
    backgroundColor: '#29e86f',
    padding: moderateScale(16),
    borderRadius: moderateScale(18),
    alignItems: 'center',
    marginBottom: moderateScale(18),
  },
  buttonSecondary: {
    backgroundColor: '#23c95a',
    padding: moderateScale(16),
    borderRadius: moderateScale(18),
    alignItems: 'center',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(18),
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: fontScale(16) },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: moderateScale(30),
  },
  modalContent: {
    backgroundColor: '#083b32',
    borderRadius: moderateScale(18),
    padding: moderateScale(20),
  },
  modalItem: { paddingVertical: moderateScale(12) },
  modalText: { color: '#fff', fontSize: fontScale(16), textAlign: 'center' },
  cancelText: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: moderateScale(14),
    fontSize: fontScale(15),
    opacity: 0.8,
  },
});