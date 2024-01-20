import { Pressable } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "../../../components/Themed";
import { NunitoBoldText } from "../../../components/StyledText";

export default function CategoriesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerLeft: () => (
          <View className="flex-row items-center gap-x-6">
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={26} />
            </Pressable>
            <NunitoBoldText
              style={{
                fontSize: 20,
              }}
            >
              Kateqoriyalar
            </NunitoBoldText>
          </View>
        ),
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[slug]" />
    </Stack>
  );
}
