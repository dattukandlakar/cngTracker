import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { PumpListScreen } from '../screens/PumpListScreen';
import { PumpDetailsScreen } from '../screens/PumpDetailsScreen';

export type HomeStackParamList = {
  Home: undefined;
  PumpList: undefined;
  PumpDetails: { pumpId: string };
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
    </Stack.Navigator>
  );
}

