/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */



import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppNavigator } from './app/navigation/AppNavigator';
import { store } from './app/store';
import { cngColors } from './app/theme/cngTheme';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={cngColors.primaryDarker} />
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent() {
  return (
    <GestureHandlerRootView
      style={[
        styles.container,
      ]}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cngColors.primaryDarker,
  },
});

export default App;
