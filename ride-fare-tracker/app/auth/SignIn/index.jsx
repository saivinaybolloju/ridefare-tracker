import { Text, TextInput, View,StyleSheet } from 'react-native'

export default function SignIn() {
  return (
    <View>
      <Text>Lets Sign You In</Text>
      <Text>Welcome Back,</Text>
      <Text>You've been missed!</Text>

      {/* EMAIL */}
      <View>
        <Text style={styles.text}>Email</Text>
        <TextInput placeholder='Enter mailID' autoCapitalize='none' keyboardType='email-address'>
        </TextInput>
      </View>

      {/* PASSWORD */}
      <View>
        <Text style={styles.text}>Password</Text>
        <TextInput secureTextEntry='true' placeholder='Enter password' autoCapitalize='none' keyboardType='password'>
        </TextInput>
      </View>

    </View>
  )
}
const styles=StyleSheet.create({
    text:{
        color:"white"
    }
})