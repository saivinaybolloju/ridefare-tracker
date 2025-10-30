import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import { Dimensions, StyleSheet, View } from 'react-native';
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/cover-page-pic.png')}
          style={styles.headerImage}
           contentFit="cover"
        />
      }>
      <View style={styles.titleContainer}>
        <ThemedText type='title'>
          Ride Fare Tracker
        </ThemedText>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerImage: {
    width: width,
    height: 250, 
  },
});
