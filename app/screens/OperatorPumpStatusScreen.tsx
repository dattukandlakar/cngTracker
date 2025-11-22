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
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  cardContainer: {
    marginTop: 90,
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: 22,
    padding: 22,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  infoBox: {
    backgroundColor: 'rgba(0,0,0,0.32)',
    padding: 18,
    borderRadius: 18,
    marginBottom: 25,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { color: '#fff', fontSize: 15, fontWeight: '600' },
  value: { color: '#fff', fontSize: 15 },
  label2: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 15,
  },
  dropdown: {
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  dropdownText: { color: '#fff', fontSize: 16 },
  dropdownIcon: { color: '#fff', fontSize: 18 },
  buttonPrimary: {
    backgroundColor: '#29e86f',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 18,
  },
  buttonSecondary: {
    backgroundColor: '#23c95a',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 30,
  },
  modalContent: {
    backgroundColor: '#083b32',
    borderRadius: 18,
    padding: 20,
  },
  modalItem: { paddingVertical: 12 },
  modalText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  cancelText: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 14,
    fontSize: 15,
    opacity: 0.8,
  },
});