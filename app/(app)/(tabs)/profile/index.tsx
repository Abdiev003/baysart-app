import { View, Image, Pressable } from "react-native";
import React from "react";
import {
  NunitoMediumText,
  NunitoText,
} from "../../../../components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSession } from "../../../../providers/auth-provider";

export default function ProfileScreen() {
  const { session, signOut } = useSession()!;
  const user = JSON.parse(session!);

  return (
    <View className="flex-1 bg-white pt-4">
      <View className="flex-row items-center px-5">
        <Image
          width={64}
          height={64}
          resizeMode="contain"
          className="w-16 h-16"
          source={require("../../../../assets/images/general/avatar.png")}
        />
        <View className="flex-col ml-4">
          <NunitoMediumText className="text-lg">{user.name}</NunitoMediumText>
          <NunitoText className="text-base text-[#999BA9]">
            {user.email}
          </NunitoText>
        </View>
      </View>

      <View>
        <Pressable
          onPress={() => {
            router.push("/(app)/(tabs)/profile/edit");
          }}
          className="flex-row items-center justify-between border-b border-[#ddd] p-5"
        >
          <View className="flex-row items-center">
            <Ionicons name="person" size={24} color="#574FA0" />
            <NunitoText className="pl-2">Profilin Redaktəsi</NunitoText>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#574FA0" />
        </Pressable>

        <Pressable
          onPress={() => {
            router.push("/(app)/(tabs)/profile/orders");
          }}
          className="flex-row items-center justify-between border-b border-[#ddd] p-5"
        >
          <View className="flex-row items-center">
            <Ionicons name="card" size={24} color="#574FA0" />
            <NunitoText className="pl-2">Sifarişlərim</NunitoText>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#574FA0" />
        </Pressable>

        <Pressable
          onPress={() => {
            router.push("/(app)/(tabs)/profile/addresses/");
          }}
          className="flex-row items-center justify-between border-b border-[#ddd] p-5"
        >
          <View className="flex-row items-center">
            <Ionicons name="location" size={24} color="#574FA0" />
            <NunitoText className="pl-2">Ünvanlarım</NunitoText>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#574FA0" />
        </Pressable>

        <Pressable
          onPress={signOut}
          className="flex-row items-center justify-between border-b border-[#ddd] p-5"
        >
          <View className="flex-row items-center">
            <Ionicons name="exit" size={24} color="#574FA0" />
            <NunitoText className="pl-2">Çıxış</NunitoText>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#574FA0" />
        </Pressable>
      </View>
    </View>
  );
}
