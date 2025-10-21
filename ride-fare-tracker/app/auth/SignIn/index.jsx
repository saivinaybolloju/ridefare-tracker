import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignIn() {
  const router=useRouter();
  return (
    <ScrollView>  
    <View style={styles.container}>
      <Text style={styles.title}>Lets Sign You In</Text>
      <Text style={styles.subtitle}>Welcome Back,</Text>
      <Text style={styles.subtitle2}>You've been missed!</Text>

      {/* EMAIL */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder='Enter your email' placeholderTextColor="#999" autoCapitalize='none' keyboardType='email-address'>
        </TextInput>
      </View>

      {/* PASSWORD */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} secureTextEntry='true' placeholderTextColor="#999" placeholder='Enter your password' autoCapitalize='none' keyboardType='password'>
        </TextInput>
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>


      {/* SIGNUP INFO*/}
      <View style={{paddingTop:"2px", padding:"30px", alignItems:'center'}}>
        <Text style={{ color: '#777',fontSize: 16,marginBottom:"2px"}}>New User?</Text>
        <TouchableOpacity onPress={() => router.push("auth/SignUp")}>
            <Text
              style={styles.subtitle}
            >
              Create New Account
            </Text>
          </TouchableOpacity>
      </View>

    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle2: {
    color: '#777',
    fontSize: 16,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    color: '#ccc',
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
    backgroundColor: '#e3edf8ff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#e6f2ffff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  buttonText: {
    color: '#0e0000ff',
    fontSize: 18,
    fontWeight: '600',
  },
});