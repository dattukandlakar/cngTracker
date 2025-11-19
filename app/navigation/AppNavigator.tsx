import React from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { useAppSelector } from '../store';

import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { cngColors } from '../theme/cngTheme';

enableScreens();

const buildTheme = (scheme: ColorSchemeName): Theme => {
  const dark = scheme !== 'light';
  return {
    dark,
    colors: {
      primary: cngColors.accent,
      background: cngColors.primaryDark,
      card: cngColors.primary,
      text: cngColors.textOnDark,
      border: cngColors.border,
      notification: cngColors.accentSoft,
    },
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400' as const,
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '700' as const,
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '800' as const,
      },
    },
  };
};

export function AppNavigator() {
  const scheme = useColorScheme();
  const user = useAppSelector((state: any) => state.auth.user);

  const navigationTheme = React.useMemo(() => buildTheme(scheme), [scheme]);

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

