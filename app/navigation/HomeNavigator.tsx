import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { PumpListScreen } from '../screens/PumpListScreen';
import { PumpDetailsScreen } from '../screens/PumpDetailsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { UpdateProfileScreen } from '../screens/UpdateProfileScreen';

export type HomeStackParamList = {
  Home: undefined;
  PumpList: undefined;
  PumpDetails: { pumpId: string };
  Profile: undefined;
  UpdateProfile: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PumpList" component={PumpListScreen} />
      <Stack.Screen name="PumpDetails" component={PumpDetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    </Stack.Navigator>
  );
}