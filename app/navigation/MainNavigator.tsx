import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator } from './HomeNavigator';
import { SearchScreen } from '../screens/SearchScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { cngColors } from '../theme/cngTheme';

const Tab = createBottomTabNavigator();

function TabIcon({ name }: Readonly<{ name: 'home' | 'search' | 'profile' }>) {
  const iconMap: Record<typeof name, string> = {
    home: '🏠',
    search: '🔍',
    profile: '👤',
  };
  return <Text style={{ fontSize: 20 }}>{iconMap[name]}</Text>;
}

const HomeTabIcon = () => <TabIcon name="home" />;
const SearchTabIcon = () => <TabIcon name="search" />;
const ProfileTabIcon = () => <TabIcon name="profile" />;

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cngColors.accent,
        tabBarInactiveTintColor: cngColors.textMuted,
        tabBarStyle: {
          backgroundColor: cngColors.primary,
          borderTopColor: cngColors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: SearchTabIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

