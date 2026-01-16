import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

type Ride = {
  id: number;
  from: string;
  to: string;
  date: string;
  rideType: string;
};

export default function RideDetails() {
  const params = useLocalSearchParams();
  const rideParam = params.ride;
  // console.log(rideParam);

  if (!rideParam || typeof rideParam !== 'string') {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>
          No ride data found.
        </Text>
      </View>
    );
  }

  const data: Ride = JSON.parse(rideParam);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: '700',color:'#fff' }}>
        {data.from} → {data.to}
      </Text>

      <Text style={{ marginTop: 12, fontSize: 16 ,color:'#fff' }}>
        Ride Type: {data.rideType}
      </Text>

      <Text style={{ marginTop: 6, fontSize: 16 ,color:'#fff' }}>
        Date: {new Date(data.date).toLocaleDateString('en-IN')}
      </Text>
    </View>
  );
}
