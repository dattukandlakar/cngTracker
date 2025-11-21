import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { HomeNavigator } from './HomeNavigator';
import { SearchNavigator } from './SearchNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { cngColors } from '../theme/cngTheme';

const Tab = createBottomTabNavigator();

function TabBarBackground() {
  return (
    <LinearGradient
      colors={['#D5F981', '#A9F06E', '#75DE5F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={StyleSheet.absoluteFill}
    />
  );
}

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
        tabBarActiveTintColor: '#0F2C3E',
        tabBarInactiveTintColor: 'rgba(15, 44, 62, 0.6)',
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -3 },
          position: 'absolute',
          overflow: 'hidden',
        },
        tabBarBackground: () => <TabBarBackground />,
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
        component={SearchNavigator}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: SearchTabIcon,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

