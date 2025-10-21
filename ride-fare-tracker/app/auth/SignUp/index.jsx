import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function index() {
    const router=useRouter();
  return (
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Create New Account</Text>
          <Text style={styles.subtitle}>Welcome User,</Text>
          <Text style={styles.subtitle2}>Kickstart your Journey!</Text>
    
          {/* USERNAME */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} placeholder='Enter your username' placeholderTextColor="#999" autoCapitalize='none' keyboardType='username'>
            </TextInput>
          </View>
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
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>


            {/* SIGNIN INFO */}
            <View style={{paddingTop:"2px", padding:"30px", alignItems:'center'}}>
                  <Text style={{ color: '#777',fontSize: 16,marginBottom:"2px"}}>Have an Account?</Text>
                  <TouchableOpacity onPress={() => router.push("auth/SignIn")}>
                      <Text
                        style={styles.subtitle}
                      >
                        Use Sign In 
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
  scrollContainer: {
  flexGrow: 1,
}

});