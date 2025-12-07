export interface SignupRequest {
  userName: string;
  mobileNumber: string;
  deviceId: string;
}

export interface SignupResponse {
  id: string;
  userName: string;
  mobileNumber: string;
  deviceId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  mobileNumber: string;
  deviceId: string;
}

export interface LoginResponse {
  id: string;
  userName: string;
  mobileNumber: string;
  deviceId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}