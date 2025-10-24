import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Toast from 'react-native-toast-message';

import { useSignUp } from '@clerk/clerk-expo';

export default function VerifyOTP() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Get query params from router
  const email = params.email as string; // Type assertion

  const { signUp, setActive, isLoaded } = useSignUp();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      // Verify OTP with Clerk
      const result = await signUp.attemptEmailAddressVerification({ code: otp });

      // Activate the session
      await setActive({ session: result.createdSessionId });

      //Show Notification
       Toast.show({
        type: 'success',
        text1: 'OTP Verified',
        text2: 'You are now logged in!',
      });

      // Navigate to main app tabs
      router.replace('/(tabs)');

    } catch (err: any) {
      const errorObj = err?.errors?.[0] || {};
      const message = errorObj?.message || err.message || 'OTP verification failed';

      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: message,
      });     
      console.error('OTP verification failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>Check your email: {email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify OTP'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#0d0d0d', paddingTop: 80 },
  title: { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 12 },
  subtitle: { color: '#ccc', fontSize: 16, marginBottom: 24 },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#e3edf8ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#0e0000ff', fontSize: 18, fontWeight: '600' },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
});
