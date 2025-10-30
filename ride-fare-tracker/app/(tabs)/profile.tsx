import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <ThemedView style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Profile
        </ThemedText>

        <ThemedView style={styles.infoBox}>
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

          <TouchableOpacity
            style={styles.signOutBtn}
            activeOpacity={0.7}
            onPress={async () => {
              try {
                await signOut();
                Toast.show({
                  type: 'success',
                  text1: 'Sign Out Successful',
                  text2: 'Can’t wait to see you back online!',
                });
                router.replace('/auth/SignIn');
              } catch (err) {
                // console.error('Sign out failed:', err);
                Toast.show({
                  type: 'error',
                  text1: 'Sign Out Failed',
                  text2: 'Please try again later.',
                });
              }
            }}
          >
            <ThemedText type="defaultSemiBold" style={styles.signOutText}>
              Sign out
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
    marginTop: 100,
    marginLeft:25
  },
  infoBox: {
    borderRadius: 12,
    padding: 24,
    paddingTop: 0,
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
    marginTop: 40,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
