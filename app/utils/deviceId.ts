import AsyncStorage from '@react-native-async-storage/async-storage';

const DEVICE_ID_KEY = '@cng_tracker_device_id';

/**
 * Generates a unique device ID and stores it persistently.
 * If a device ID already exists, it returns the existing one.
 * @returns Promise<string> - The device ID
 */
export async function getDeviceId(): Promise<string> {
  try {
    // Try to get existing device ID
    const existingId = await AsyncStorage.getItem(DEVICE_ID_KEY);
    if (existingId) {
      return existingId;
    }

    // Generate a new device ID
    const deviceId = generateUniqueId();
    
    // Store it for future use
    await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId);
    
    return deviceId;
  } catch (error) {
    // Fallback: generate a new ID if storage fails
    console.warn('Failed to access device storage, using temporary ID:', error);
    return generateUniqueId();
  }
}

/**
 * Generates a unique identifier using timestamp and random string
 * Format: timestamp-randomstring (e.g., "1734567890123-abc123def456")
 */
function generateUniqueId(): string {
  const timestamp = Date.now().toString();
  const randomStr = Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomStr}`;
}

/**
 * Clears the stored device ID (useful for testing or logout scenarios)
 */
export async function clearDeviceId(): Promise<void> {
  try {
    await AsyncStorage.removeItem(DEVICE_ID_KEY);
  } catch (error) {
    console.warn('Failed to clear device ID:', error);
  }
}

