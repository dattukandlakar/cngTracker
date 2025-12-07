import apiClient from './api';
import { NearbyPump } from '../types/pumps';

export class PumpService {
  /**
   * Fetch nearby pumps based on latitude and longitude
   * @param lat Latitude coordinate
   * @param lng Longitude coordinate
   * @returns Promise<NeabyPump[]> Array of nearby pumps
   */
  static async getNearbyPumps(lat: number, lng: number): Promise<NearbyPump[]> {
    try {
      const response = await apiClient.get<NearbyPump[]>(`/pumps/nearby?lat=${lat}&lng=${lng}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching nearby pumps:', error);
      throw error;
    }
  }
}