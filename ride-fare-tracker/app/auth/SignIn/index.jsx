import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Toast from 'react-native-toast-message';

import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const router=useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>  
    <View style={styles.container}>
      <Text style={styles.title}>Lets Sign You In</Text>
      <Text style={styles.subtitle}>Welcome Back,</Text>
      <Text style={styles.subtitle2}>You've been missed!</Text>

      {/* EMAIL */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder='Enter your email' placeholderTextColor="#999" autoCapitalize='none' keyboardType='email-address' value={email} onChangeText={setEmail}>
        </TextInput>
      </View>

      {/* PASSWORD */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} secureTextEntry={true} placeholderTextColor="#999" placeholder='Enter your password' autoCapitalize='none' keyboardType='default' value={password} onChangeText={setPassword}>
        </TextInput>
      </View>

      {/* SIGNIN ACCOUNT BUTTON */}
      <TouchableOpacity style={styles.button} 
      
      onPress={async () => {
                if (!isLoaded) return;
                try {
                  // Sign-in
                  const signInResult = await signIn.create({ identifier: email, password });

                  if (signInResult.status === 'complete') {
                    
                    await setActive({ session: signInResult.createdSessionId });

                    Toast.show({
                      type: 'success',
                      text1: 'Login successful',
                      text2: 'Welcome back!!',
                    });

                    router.replace('/(tabs)');
                  } else {

                    Toast.show({
                      type: 'info',
                      text1: 'Verification required',
                      text2: 'Please check your email for verification.',
                    });

                  }
                } catch (err) {

                  // console.error('Sign-in error:', err);

                  const errorObj = err?.errors?.[0] || {};
                  const code = errorObj?.code;
                  const message = errorObj?.message || err.message || '';


                  if (code === 'form_identifier_not_found'|| message.includes('not found')) {
                    Toast.show({
                      type: 'error',
                      text1: 'User not found',
                      text2: 'Please sign up before logging in.',
                    });
                  } else if (code === 'form_password_incorrect'|| message.includes('Password is incorrect')) {
                    Toast.show({
                      type: 'error',
                      text1: 'Incorrect password',
                      text2: 'Try again or reset your password.',
                    });
                  } else {
                    Toast.show({
                      type: 'error',
                      text1: 'Sign-in Failed',
                      text2: err.errors?.[0]?.message || 'Unexpected error occurred.',
                    });
                  }
                  
                }}
}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>


        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#000000', marginTop: 20 }]}
          onPress={async () => {
            try {
              const { createdSessionId, setActive } = await startOAuthFlow();
              if (createdSessionId) {
                await setActive({ session: createdSessionId });

                Toast.show({
                      type: 'success',
                      text1: 'Login successful',
                      text2: 'Welcome back!!',
                    });

                router.replace('(tabs)');
              }else{
                Toast.show({
                  type: 'info',
                  text1: 'Google Sign-in Incomplete',
                  text2: 'Please try again or use email/password.',
                });
              }
            } catch (err) {
              console.error('Google sign-in error:', err);
              Toast.show({
                type: 'error',
                text1: 'Google Sign-in Failed',
                text2: 'Something went wrong. Please try again.',
              });
            }
          }}
        >
        <View style={styles.googleButtonContent}>
  <Image
    source={require('@/assets/images/google-logo.png')}
    style={styles.googleLogo}
  />
  <Text style={[styles.buttonText, { color: '#fff' }]}>Sign in with Google</Text>
</View>

        </TouchableOpacity>



      {/* SIGNUP INFO*/}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>New User?</Text>
        <TouchableOpacity onPress={() => router.push("auth/SignUp")}>
          <Text style={styles.subtitle}>Create New Account</Text>
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
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleLogo: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  footerContainer: {
    paddingTop: 50,
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#777',
    fontSize: 16,
    marginBottom: 4,
  },
});