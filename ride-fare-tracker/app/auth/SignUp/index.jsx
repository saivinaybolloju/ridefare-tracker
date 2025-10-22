import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
WebBrowser.maybeCompleteAuthSession();

export default function index() {
    const router=useRouter();
    const { signUp, setActive, isLoaded } = useSignUp();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Create New Account</Text>
          <Text style={styles.subtitle}>Welcome User,</Text>
          <Text style={styles.subtitle2}>Kickstart your Journey!</Text>
    
          {/* USERNAME */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} placeholder='Enter your username' placeholderTextColor="#999" autoCapitalize='none' keyboardType='username' value={username} onChangeText={setUsername}>
            </TextInput>
          </View>
          {/* EMAIL */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder='Enter your email' placeholderTextColor="#999" autoCapitalize='none' keyboardType='email-address' value={email} onChangeText={setEmail}>
            </TextInput>
          </View>
    
          {/* PASSWORD */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} secureTextEntry={true} placeholderTextColor="#999" placeholder='Enter your password' autoCapitalize='none' keyboardType='password' value={password} onChangeText={setPassword}>
            </TextInput>
          </View>
    
          {/* BUTTON */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}
            onPress={async () => {
              if (!isLoaded) return;

              try {
                // Create account
                await signUp.create({
                  emailAddress: email,
                  password,
                  firstName:username,
                });

                // Verify email automatically (Clerk handles OTP emails)
                await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

               router.push({
                  pathname: 'auth/verifyOTP',
                  params: { email }, // pass email to OTP screen
                });
              } catch (err) {
                console.error('Sign-up error:', err);
              }
            }}
            >Create Account</Text>
          </TouchableOpacity>


            {/* SIGNIN INFO */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Have an Account?</Text>
              <TouchableOpacity onPress={() => router.push("auth/SignIn")}>
                <Text style={styles.subtitle}>Use Sign In</Text>
              </TouchableOpacity>
            </View>

    
        </View>
        </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#0d0d0d',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle2: {
    color: '#999',
    fontSize: 16,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 22,
  },
  label: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#e3edf8',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    shadowColor: '#e6f2ff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  buttonText: {
    color: '#0e0000',
    fontSize: 17,
    fontWeight: '600',
  },
  footerContainer: {
    paddingTop: 30,
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#777',
    fontSize: 16,
    marginBottom: 4,
  },
});
