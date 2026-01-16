import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

type Ride = {
  id: number;
  from: string;
  to: string;
  date: string;
  rideType: string;
};

const UserRides: Ride[] = [
  {
    id: 1,
    from: 'Hyderabad',
    to: 'Bangalore',
    date: '2026-01-10',
    rideType: 'Cab',
  },
  {
    id: 2,
    from: 'Vijayawada',
    to: 'Chennai',
    date: '2026-01-12',
    rideType: 'Bike',
  },
  {
    id: 3,
    from: 'Delhi',
    to: 'Agra',
    date: '2026-01-15',
    rideType: 'Auto',
  },
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export default function UserRideList(){
  const router = useRouter();

  return (
    <View style={{ padding: 15, marginTop:300}}>
        <Text style={{ fontSize: 18, fontWeight: '300', color:'#fff', paddingBottom:20 }}>Previous Ride Details : </Text>
      {UserRides.map((ride) => (
        <View
          key={ride.id}
          style={{
            backgroundColor: '#000',
            padding: 15,
            borderRadius: 12,
            marginBottom: 12,
            elevation: 3,
          }}
        >
          {/* FROM → TO */}
          <Text style={{ fontSize: 18, fontWeight: '500', color:'#fff' }}>
            {ride.from} → {ride.to}
          </Text>

          {/* DATE & TYPE */}
          <Text style={{ color: '#777', marginTop: 4 }}>
            {formatDate(ride.date)} · {ride.rideType}
          </Text>

          {/* BUTTON */}
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/ridedetails/ride-details',
                params: { ride: JSON.stringify(ride) },
              })
            }
            style={{
              backgroundColor: '#000',
              padding: 8,
              borderRadius: 10,
              marginTop: 15,
              borderWidth: 0.2,
              borderColor: '#eeff00ff',
            }}
          >
            <Text style={{ color: '#ffffffff', textAlign: 'center' }}>
              View Ride
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
