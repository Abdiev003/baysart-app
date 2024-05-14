import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { NunitoBoldText } from "../../../components/StyledText";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProductsLayout() {
  const params = useLocalSearchParams();

  const collectionName = (params.params as any).collectionName;

  return (
    <Stack>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.push("/(app)/(tabs)");
                }
              }}
            >
              <Ionicons name="arrow-back" size={26} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <NunitoBoldText
              style={{
                fontSize: 20,
              }}
            >
              {collectionName ? collectionName : "Məhsullar"}
            </NunitoBoldText>
          ),
        }}
        name="index"
      />
      <Stack.Screen
        name="[slug]/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
