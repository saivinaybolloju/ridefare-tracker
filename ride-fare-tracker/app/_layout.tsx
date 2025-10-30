import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ClerkProvider } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

import { toastConfig } from '@/components/CustomToast';
import Toast from 'react-native-toast-message';


//----------------------CLERK AUTH CONFIGURATION----------------------------


//Clerk publishable key from the dashboard
const CLERK_PUBLISHABLE_KEY = Constants.expoConfig?.extra?.clerkPublishableKey;

//Secure token storage for mobile sessions
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      // ignore
    }
  },
};

//----------------------------------------------------------------------

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ClerkProvider>
    
    <Toast config={toastConfig} position="top" visibilityTime={2500}/>
    </>
  );
}
