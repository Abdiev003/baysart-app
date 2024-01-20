import { Stack } from "expo-router";

export default function AppLayout() {
  // This layout can be deferred because it's not the root layout.
  return <Stack screenOptions={{ headerShown: false }} />;
}
