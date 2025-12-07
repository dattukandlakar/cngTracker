import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'https://cng-tracker.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

// Request interceptor to add device ID to all requests
apiClient.interceptors.request.use(
  async config => {
    // Import here to avoid circular dependencies
    const { getDeviceId } = await import('../utils/deviceId');
    const deviceId = await getDeviceId();
    
    if (config.data) {
      // Add deviceId to request payload
      const requestData = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      requestData.deviceId = deviceId;
      config.data = JSON.stringify(requestData);
    } else {
      // If no data, create new object with deviceId
      config.data = JSON.stringify({ deviceId });
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;