import React from "react";
import { Redirect, Stack, router } from "expo-router";
import { NunitoBoldText } from "../../../../components/StyledText";
import { View } from "../../../../components/Themed";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSession } from "../../../../providers/auth-provider";

export default function ProfileLayout() {
  const { session, isLoading } = useSession()!;

  if (isLoading) {
    return <NunitoBoldText>Loading...</NunitoBoldText>;
  }

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerLeft: () => null,
          headerTitle: () => (
            <NunitoBoldText
              style={{
                fontSize: 19,
              }}
            >
              Profil
            </NunitoBoldText>
          ),
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push("/(app)/(tabs)/profile");
              }}
            >
              <Ionicons name="arrow-back" size={26} />
            </Pressable>
          ),
          headerTitle: () => (
            <NunitoBoldText
              style={{
                fontSize: 19,
              }}
            >
              Profil
            </NunitoBoldText>
          ),
        }}
      />
      <Stack.Screen
        name="orders/index"
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push("/(app)/(tabs)/profile");
              }}
            >
              <Ionicons name="arrow-back" size={26} />
            </Pressable>
          ),
          headerTitle: () => (
            <NunitoBoldText className="text-[19px]">
              Sifarişlərim
            </NunitoBoldText>
          ),
        }}
      />
      <Stack.Screen
        name="orders/[id]"
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.push("/(app)/(tabs)/profile");
                }
              }}
            >
              <Ionicons name="arrow-back" size={26} />
            </Pressable>
          ),
          headerTitle: () => (
            <NunitoBoldText className="text-[19px]">
              Məhsul Məlumatları
            </NunitoBoldText>
          ),
        }}
      />
      <Stack.Screen
        name="addresses/index"
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <View className="flex-row items-center gap-x-6">
              <Pressable
                onPress={() => {
                  router.back();
                }}
              >
                <Ionicons name="arrow-back" size={26} />
              </Pressable>
            </View>
          ),
          headerTitle: () => (
            <NunitoBoldText className="text-[19px]">Ünvanlarım</NunitoBoldText>
          ),
        }}
      />
      <Stack.Screen
        name="addresses/[id]"
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <View className="flex-row items-center gap-x-6">
              <Pressable
                onPress={() => {
                  router.back();
                }}
              >
                <Ionicons name="arrow-back" size={26} />
              </Pressable>
            </View>
          ),
          headerTitle: () => (
            <NunitoBoldText className="text-[19px]">Redaktə Et</NunitoBoldText>
          ),
        }}
      />
      <Stack.Screen
        name="addresses/create"
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <View className="flex-row items-center gap-x-6">
              <Pressable
                onPress={() => {
                  router.back();
                }}
              >
                <Ionicons name="arrow-back" size={26} />
              </Pressable>
            </View>
          ),
          headerTitle: () => (
            <NunitoBoldText className="text-[19px]">
              Ünvan əlavə et
            </NunitoBoldText>
          ),
        }}
      />
    </Stack>
  );
}
