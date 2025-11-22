import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import { GradientButton } from '../components/GradientButton';
import { cngColors } from '../theme/cngTheme';
import { scale, verticalScale, moderateScale, fontScale } from '../../utils/responsive';

export function AddPumpScreen({ navigation }:any) {
  const [pumpName, setPumpName] = useState('');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [useHardcoded, setUseHardcoded] = useState(false);
  const [addedPump, setAddedPump] = useState<any>(null);
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const [workerUserCode, setWorkerUserCode] = useState('');
  const [workerMobile, setWorkerMobile] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [workers, setWorkers] = useState<any[]>([]);

  const handleGetLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setUseHardcoded(false);
        Alert.alert('Success', 'Location detected successfully!');
      },
      error => {
        // Use hardcoded coordinates for testing when location fails
        setCoords({
          latitude: 23.0504,
          longitude: 72.5242,
        });
        setUseHardcoded(true);
        Alert.alert('Info', 'Using test coordinates (Ahmedabad) as location is unavailable.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleAddPump = () => {
    if (!pumpName || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!coords.latitude || !coords.longitude) {
      Alert.alert('Error', 'Live location is required. Please tap Track Live Location.');
      return;
    }

    const newPump = {
      id: Date.now().toString(),
      name: pumpName,
      address,
      coords: { ...coords },
    };

    setAddedPump(newPump);
    Alert.alert('Success', `Pump Added Successfully!`);
  };

  const handleUpdatePump = () => {
    if (!pumpName || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!coords.latitude || !coords.longitude) {
      Alert.alert('Error', 'Live location is required. Please tap Track Live Location.');
      return;
    }

    const updatedPump = {
      ...addedPump,
      name: pumpName,
      address,
      coords: { ...coords },
    };

    setAddedPump(updatedPump);
    setIsEditing(false);
    Alert.alert('Success', 'Pump details updated successfully!');
  };

  const handleAddWorker = () => {
    if (!workerUserCode || !workerMobile) {
      Alert.alert('Error', 'Please fill in all worker details');
      return;
    }

    const newWorker = {
      id: Date.now().toString(),
      userCode: workerUserCode,
      mobile: workerMobile,
    };

    setWorkers([...workers, newWorker]);
    setWorkerUserCode('');
    setWorkerMobile('');
    setShowWorkerModal(false);
    Alert.alert('Success', 'Worker added successfully!');
  };

  const resetForm = () => {
    setPumpName('');
    setAddress('');
    setCoords({ latitude: null, longitude: null });
    setAddedPump(null);
    setUseHardcoded(false);
    setIsEditing(false);
    setWorkers([]);
  };

  const editPump = () => {
    if (addedPump) {
      setPumpName(addedPump.name);
      setAddress(addedPump.address);
      setCoords(addedPump.coords);
      setIsEditing(true);
    }
  };

  return (
    <LinearGradient
      colors={['#2B5876', '#1E3D59', '#17628A', '#4E9F8E']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>{isEditing ? 'Update Pump' : 'Add Pump Details'}</Text>
          <View style={{ width: moderateScale(40) }} />
        </View>

        {/* Form */}
        <ScrollView style={styles.formContainer}>
          {!addedPump || isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Pump Name"
                placeholderTextColor={cngColors.textMuted}
                value={pumpName}
                onChangeText={setPumpName}
              />

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Address"
                placeholderTextColor={cngColors.textMuted}
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
              />

              {/* Mandatory Live Location Button */}
              <Pressable style={styles.locationButton} onPress={handleGetLocation}>
                <Text style={styles.locationButtonText}>📍 Track Live Location</Text>
              </Pressable>

              {coords.latitude && coords.longitude && (
                <View style={styles.locationContainer}>
                  <Text style={styles.locationText}>
                    Latitude: {coords.latitude.toFixed(4)}
                  </Text>
                  <Text style={styles.locationText}>
                    Longitude: {coords.longitude.toFixed(4)}
                  </Text>
                  {useHardcoded && (
                    <Text style={styles.hardcodedText}>
                      Using test coordinates for development
                    </Text>
                  )}
                </View>
              )}

              <GradientButton 
                title={isEditing ? "UPDATE PUMP" : "ADD PUMP"} 
                onPress={isEditing ? handleUpdatePump : handleAddPump} 
              />
              
              {isEditing && (
                <Pressable style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
              )}
            </>
          ) : (
            <>
              {/* Display Added Pump Details */}
              <Text style={styles.sectionTitle}>Pump Details</Text>
              
              <View style={styles.pumpCard}>
                <Text style={styles.pumpName}>{addedPump.name}</Text>
                <Text style={styles.pumpDetail}>📍 {addedPump.address}</Text>
                <Text style={styles.pumpDetail}>
                  Coords: {addedPump.coords.latitude.toFixed(4)}, {addedPump.coords.longitude.toFixed(4)}
                  {useHardcoded && ' (Test)'}
                </Text>
              </View>
              
              {/* Worker List Section */}
              <Text style={styles.sectionTitle}>Workers</Text>
              
              {workers.length > 0 ? (
                <View style={styles.workerList}>
                  {workers.map((worker) => (
                    <View key={worker.id} style={styles.workerCard}>
                      <Text style={styles.workerDetail}>User Code: {worker.userCode}</Text>
                      <Text style={styles.workerDetail}>Mobile: {worker.mobile}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.noWorkersText}>No workers added yet</Text>
              )}
              
              <View style={styles.buttonRow}>
                <GradientButton 
                  title="Update Pump" 
                  onPress={editPump} 
                  style={styles.actionButton}
                />
                <GradientButton 
                  title="Add Worker" 
                  onPress={() => setShowWorkerModal(true)} 
                  style={styles.actionButton}
                />
              </View>
              
              {/* <GradientButton 
                title="Add Another Pump" 
                onPress={resetForm} 
                variant="secondary"
              /> */}
            </>
          )}
        </ScrollView>
      </View>

      {/* Worker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showWorkerModal}
        onRequestClose={() => setShowWorkerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Worker</Text>
              <Pressable 
                onPress={() => setShowWorkerModal(false)} 
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Worker User Code"
              placeholderTextColor={cngColors.textMuted}
              value={workerUserCode}
              onChangeText={setWorkerUserCode}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Mobile Number"
              placeholderTextColor={cngColors.textMuted}
              value={workerMobile}
              onChangeText={setWorkerMobile}
              keyboardType="phone-pad"
            />
            
            <GradientButton 
              title="ADD WORKER" 
              onPress={handleAddWorker} 
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(16), paddingBottom: moderateScale(20),
  },
  backButton: { width: moderateScale(40), height: moderateScale(40), justifyContent: 'center', alignItems: 'center' },
  backButtonText: { fontSize: fontScale(24), color: cngColors.textOnDark, fontWeight: '600' },
  headerTitle: { fontSize: fontScale(20), fontWeight: '700', color: cngColors.textOnDark },
  formContainer: { paddingHorizontal: moderateScale(24), flex: 1 },
  sectionTitle: {
    fontSize: fontScale(18),
    fontWeight: '700',
    color: cngColors.textOnDark,
    marginBottom: moderateScale(16),
    marginTop: moderateScale(8),
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    color: cngColors.textOnDark,
    fontSize: fontScale(16),
  },
  textArea: {
    height: moderateScale(100),
    textAlignVertical: 'top',
  },

  /* Location Button */
  locationButton: {
    backgroundColor: '#4E9F8E',
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(16),
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#fff',
    fontSize: fontScale(16),
    fontWeight: '700',
  },
  locationContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
  },
  locationText: {
    color: '#fff',
    fontSize: fontScale(16),
    marginBottom: moderateScale(4),
  },
  hardcodedText: {
    color: '#fbbf24',
    fontSize: fontScale(14),
    fontStyle: 'italic',
    marginTop: moderateScale(8),
  },
  
  /* Pump Card */
  pumpCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  pumpName: {
    fontSize: fontScale(20),
    fontWeight: '700',
    color: cngColors.textOnDark,
    marginBottom: moderateScale(12),
  },
  pumpDetail: {
    fontSize: fontScale(16),
    color: cngColors.textOnDark,
    marginBottom: moderateScale(8),
  },
  
  /* Worker List */
  workerList: {
    marginBottom: moderateScale(20),
  },
  workerCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(12),
  },
  workerDetail: {
    fontSize: fontScale(16),
    color: cngColors.textOnDark,
    marginBottom: moderateScale(4),
  },
  noWorkersText: {
    fontSize: fontScale(16),
    color: cngColors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: moderateScale(20),
  },
  
  /* Buttons */
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(20),
  },
  actionButton: {
    flex: 1,
    marginHorizontal: moderateScale(8),
  },
  cancelButton: {
    marginTop: moderateScale(12),
    padding: moderateScale(16),
    alignItems: 'center',
  },
  cancelButtonText: {
    color: cngColors.textMuted,
    fontSize: fontScale(16),
    fontWeight: '600',
  },
  
  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: cngColors.primaryDark,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(24),
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  modalTitle: {
    fontSize: fontScale(20),
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  closeButton: {
    width: moderateScale(30),
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: cngColors.textMuted,
    fontSize: fontScale(24),
  },
  modalInput: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    color: cngColors.textOnDark,
    fontSize: fontScale(16),
  },
  modalButton: {
    marginTop: moderateScale(8),
  },
});