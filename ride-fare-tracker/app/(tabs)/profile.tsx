import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

import { useUser, useAuth } from '@clerk/clerk-expo';

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={300}
          color="#808080"
          name="person.circle"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{ fontFamily: Fonts.rounded, fontSize: 28 }}
        >
          Profile
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.infoContainer}>
        <ThemedText type="defaultSemiBold" style={styles.label}>
          Name
        </ThemedText>
        <ThemedText style={styles.value}>
          {user?.fullName || 'No name available'}
        </ThemedText>

        <ThemedText type="defaultSemiBold" style={[styles.label, { marginTop: 20 }]}>
          Email
        </ThemedText>
        <ThemedText style={styles.value}>
          {user?.primaryEmailAddress?.emailAddress || 'No email available'}
        </ThemedText>

        <TouchableOpacity style={styles.signOutBtn} 
        onPress={ async()=>{
          try {
              await signOut();           // logs out the user
              router.replace('/auth/SignIn'); // redirect to SignIn
            } catch (err) {
                console.error('Sign out failed:', err);
            }
        }}>
          <ThemedText type="defaultSemiBold" style={styles.signOutText}>
            Sign out
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -80,
    left: -30,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  infoContainer: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    color: '#fff',
  },
  signOutBtn: {
    marginTop: 32,
    alignSelf: 'stretch',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    color: '#fff',
  },
});
