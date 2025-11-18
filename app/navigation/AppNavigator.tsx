import React from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';

import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { OperationsNavigator } from './OperationsNavigator';
import { SupportScreen } from '../screens/SupportScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { logout } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { cngColors } from '../theme/cngTheme';

type AuthMode = 'login' | 'signup';

enableScreens();

const Drawer = createDrawerNavigator();

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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.auth.user);
  const [authMode, setAuthMode] = React.useState<AuthMode>('signup');
  const scheme = useColorScheme();

  const navigationTheme = React.useMemo(() => buildTheme(scheme), [scheme]);

  const handleLogout = React.useCallback(() => {
    dispatch(logout());
    setAuthMode('login');
  }, [dispatch]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: cngColors.primary },
          headerTintColor: cngColors.textOnDark,
          headerTitleAlign: 'left',
          drawerType: 'front',
          drawerActiveBackgroundColor: cngColors.surfaceAlt,
          drawerActiveTintColor: cngColors.accent,
          drawerInactiveTintColor: cngColors.textMuted,
          drawerLabelStyle: { fontSize: 15, fontWeight: '600' },
        }}>
        {user ? (
          <>
            <Drawer.Screen name="Operations">
              {() => (
                <OperationsNavigator
                  onLogout={handleLogout}
                  userName={user.name}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Support" component={SupportScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Login">
              {() =>
                authMode === 'login' ? (
                  <LoginScreen
                    onNavigateToSignup={() => {
                      setAuthMode('signup');
                    }}
                  />
                ) : (
                  <SignupScreen
                    onNavigateToLogin={() => {
                      setAuthMode('login');
                    }}
                  />
                )
              }
            </Drawer.Screen>
            <Drawer.Screen name="Support" component={SupportScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

