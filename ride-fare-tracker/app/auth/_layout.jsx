// app/(auth)/_layout.jsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn/index" />
      <Stack.Screen name="SignUp/index" />

    </Stack>
  );
}
