import { View, Pressable } from "react-native";
import React from "react";
import {
  NunitoBoldText,
  NunitoText,
} from "../../../../../components/StyledText";
import { UserAddress } from "../../../../../lib/definations";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useSession } from "../../../../../providers/auth-provider";

async function getAddresses(token: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/accounts/address/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export default function AddressesScreen() {
  const pathname = usePathname();
  const { session } = useSession()!;
  const user = JSON.parse(session!);

  const [addresses, setAddresses] = React.useState<UserAddress[]>([]);

  React.useEffect(() => {
    handleGetAddresses();
  }, [pathname]);

  const handleGetAddresses = React.useCallback(async () => {
    const data = await getAddresses(user.access);

    if (data && data.results) {
      setAddresses(data.results);
    } else {
      setAddresses([]);
    }
  }, []);

  const handleDeleteAddress = React.useCallback(async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/accounts/address/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.access}`,
          },
        }
      );
      await response.json();
      const newAddresses = addresses.filter((address) => address.id !== id);
      setAddresses(newAddresses);
      alert("Ünvan silindi");
    } catch (error) {
      alert("Ünvan silinərkən xəta baş verdi");
    }
  }, []);

  return (
    <View className="mt-8 mx-5 py-3 border rounded-[20px] border-[#DDD]">
      {addresses.map((address) => (
        <View
          key={address.id}
          className={`w-[335px] px-5 py-2.5 rounded-xl flex-row justify-between border-b border-[#ddd]`}
        >
          <View className="max-w-64">
            <NunitoBoldText>{address.title}</NunitoBoldText>
            <NunitoText>{address.address}</NunitoText>
            <NunitoText>{address.zip}</NunitoText>
            <NunitoText>{address.phone_number}</NunitoText>
          </View>

          <View className="justify-between">
            <Pressable
              onPress={() => {
                router.push(`/(app)/(tabs)/profile/addresses/${address.id}`);
              }}
              className="w-[30px] h-[30px] bg-[#B6B3D3] rounded-[10px] flex items-center justify-center"
            >
              <Feather name="edit" size={20} color="white" />
            </Pressable>
            <Pressable
              onPress={() => handleDeleteAddress(address.id)}
              className="w-[30px] h-[30px] bg-[#B6B3D3] rounded-[10px] flex items-center justify-center"
            >
              <Ionicons name="trash" size={20} color="white" />
            </Pressable>
          </View>
        </View>
      ))}

      <Pressable
        onPress={() => {
          router.push("/(app)/(tabs)/profile/addresses/create");
        }}
        className="w-[335px] px-5 py-2.5 rounded-xl flex-row justify-between border-b border-[#ddd]"
      >
        <Feather name="plus" size={20} color="black" />
        <NunitoBoldText>Yeni ünvan əlavə et</NunitoBoldText>
      </Pressable>
    </View>
  );
}
