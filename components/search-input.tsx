import { View, TextInput } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SearchInput() {
  const [value, onChangeText] = React.useState("");

  const onSubmit = () => {
    router.push(("/(app)/products?search=" + value) as any);
    onChangeText("");
  };

  return (
    <View className="w-full flex-shrink flex-row border mx-3 pl-3 py-1.5 border-[#ddd] rounded-[10px]">
      <FontAwesome size={20} name="search" color="#574FA0" />
      <TextInput
        id="search"
        aria-label="Axtar"
        style={{ fontFamily: "Nunito" }}
        className="w-full ml-3.5 pr-10"
        placeholder="Axtar"
        autoCapitalize="none"
        enterKeyHint="search"
        value={value}
        onSubmitEditing={onSubmit}
        onChangeText={(text) => onChangeText(text)}
      />
    </View>
  );
}
