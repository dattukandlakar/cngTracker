import { Platform, PermissionStatus, Alert, Linking } from 'react-native';
// Install: npm install @react-native-community/geolocation
import Geolocation from '@react-native-community/geolocation';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export class LocationService {
  /**
   * Request location permission from user
   */
  static async requestLocationPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        // For Android, use PermissionsAndroid
        const { PermissionsAndroid } = require('react-native');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'CNG Tracker needs access to your location to find nearest pumps',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // For iOS, permissions are handled via Info.plist
        // The permission dialog will show automatically on first request
        return true;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  /**
   * Get current user location
   */
  static async getCurrentLocation(): Promise<Coordinates | null> {
    return new Promise((resolve) => {
      // TODO: Uncomment when geolocation is installed
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          Alert.alert('Location Error', 'Unable to get your current location');
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );

      // Mock location for development (Ahmedabad, India)
      // Replace with actual geolocation after installing the package
      // setTimeout(() => {
      //   resolve({
      //     latitude: 23.0225,
      //     longitude: 72.5714,
      //   });
      // }, 500);
    });
  }

  /**
   * Calculate distance between two coordinates (in kilometers)
   * Using Haversine formula
   */
  static calculateDistance(
    coord1: Coordinates,
    coord2: Coordinates
  ): number {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = this.toRadians(coord2.latitude - coord1.latitude);
    const dLon = this.toRadians(coord2.longitude - coord1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(coord1.latitude)) *
        Math.cos(this.toRadians(coord2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  }

  /**
   * Convert degrees to radians
   */
  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Open Google Maps with directions from user location to destination
   */
  static async openGoogleMapsDirections(
    userLocation: Coordinates,
    destination: Coordinates,
    destinationName: string
  ): Promise<void> {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    
    const latLng = `${destination.latitude},${destination.longitude}`;
    const label = encodeURIComponent(destinationName);
    
    // Different URL formats for iOS and Android
    let url: string;
    
    if (Platform.OS === 'ios') {
      // iOS - Opens in Apple Maps by default, or Google Maps if installed
      url = `https://maps.apple.com/?daddr=${latLng}&saddr=${userLocation.latitude},${userLocation.longitude}`;
      
      // Alternative: Force Google Maps on iOS (if installed)
      const googleMapsUrl = `comgooglemaps://?saddr=${userLocation.latitude},${userLocation.longitude}&daddr=${latLng}&directionsmode=driving`;
      
      // Try Google Maps first, fallback to Apple Maps
      const supported = await Linking.canOpenURL(googleMapsUrl);
      if (supported) {
        url = googleMapsUrl;
      }
    } else {
      // Android - Opens Google Maps
      url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${latLng}&travelmode=driving`;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          'Cannot Open Maps',
          'Please install Google Maps or Apple Maps to get directions'
        );
      }
    } catch (error) {
      console.error('Error opening maps:', error);
      Alert.alert('Error', 'Unable to open maps application');
    }
  }

  /**
   * Check if location services are enabled
   */
  static async checkLocationEnabled(): Promise<boolean> {
    try {
      // TODO: Implement actual location services check
      // For now, return true
      return true;
    } catch (error) {
      console.error('Error checking location services:', error);
      return false;
    }
  }
}
