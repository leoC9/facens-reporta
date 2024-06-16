import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { RecoilRoot } from "recoil";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <RecoilRoot>
        <NativeBaseProvider>
          <Stack>
            <Stack.Screen options={{ headerShown: false }} name="index" />
            <Stack.Screen options={{ headerShown: false }} name="register" />
            <Stack.Screen
              options={{ headerShown: false }}
              name="forgotPassword"
            />
            <Stack.Screen options={{ headerShown: false }} name="ticketList" />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ticketDetails"
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="createTicket"
            />
          </Stack>
        </NativeBaseProvider>
      </RecoilRoot>
      <Toast />
    </>
  );
}
