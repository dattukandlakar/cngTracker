import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchScreen } from '../screens/SearchScreen';
import { PumpDetailsScreen } from '../screens/PumpDetailsScreen';

export type SearchStackParamList = {
  SearchMain: undefined;
  PumpDetails: { pumpId: string };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export function SearchNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SearchMain" component={SearchScreen} />
      <Stack.Screen name="PumpDetails" component={PumpDetailsScreen} />
    </Stack.Navigator>
  );
}
