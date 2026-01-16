import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function StartNewTripCard() {
    const router=useRouter();
    return (
    <View style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
    }}>
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text style={{
        fontSize:25,
        marginTop:10,
        gap:20,
        fontFamily:'outfit-medium',color:'#fff'
      }}>No Trips Planned Yet !!</Text>

<Text style={{
        fontSize:20,
        marginTop:10,
        gap:25,
        textAlign:'center',
        fontFamily:'outfit',color:'#fff'
      }}>Time to check fare details! Get Started below...</Text>
        <TouchableOpacity 
        onPress={()=>{router.push('/(tabs)')}}
        style={{
            padding:10,
            borderRadius:15,
            paddingHorizontal:30,
            marginTop:30,
            backgroundColor:'#000',
        }}>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20,
            color:'#fff'
            
        }}>Start a new Trip</Text>
        </TouchableOpacity>

    </View>
  )
}