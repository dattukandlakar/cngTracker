import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ViewScreen } from '../screens/ViewScreen';
import { PumpDetailsScreen } from '../screens/PumpDetailsScreen';

export type OperationsStackParamList = {
  Map: undefined;
  PumpDetails: { pumpId: string };
};

const Stack = createNativeStackNavigator<OperationsStackParamList>();

type Props = Readonly<{
  userName: string;
  onLogout: () => void;
}>;

export function OperationsNavigator({ userName, onLogout }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Map">
        {navProps => (
          <ViewScreen
            {...navProps}
            userName={userName}
            onLogout={onLogout}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        component={PumpDetailsScreen}
        name="PumpDetails"
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Pump Availability',
        }}
      />
    </Stack.Navigator>
  );
}

