import { StyleSheet } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={[styles.toastBase, { borderLeftColor: '#4CAF50', backgroundColor: '#1a1a1a' }]}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={[styles.text, { color: '#e3edf8', fontWeight: '700' }]}
      text2Style={[styles.text, { color: '#aaa' }]}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={[styles.toastBase, { borderLeftColor: '#ff4444', backgroundColor: '#1a1a1a' }]}
      text1Style={[styles.text, { color: '#ff6b6b', fontWeight: '700' }]}
      text2Style={[styles.text, { color: '#aaa' }]}
    />
  ),

  info: (props) => (
    <BaseToast
      {...props}
      style={[styles.toastBase, { borderLeftColor: '#1E90FF', backgroundColor: '#1a1a1a' }]}
      text1Style={[styles.text, { color: '#e3edf8', fontWeight: '700' }]}
      text2Style={[styles.text, { color: '#aaa' }]}
    />
  ),
};

const styles = StyleSheet.create({
  toastBase: {
    borderLeftWidth: 6,
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  text: {
    fontSize: 16,
  },
});
