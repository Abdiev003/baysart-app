import { View, Image, ScrollView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Link, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { NunitoBoldText, NunitoText } from "../../../components/StyledText";
import { FavoriteItem } from "../../../lib/definations";
import { useSession } from "../../../providers/auth-provider";

async function getFavoritesData(token: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/products/favorite/`,
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

export default function FavoritesScreen() {
  const pathname = usePathname();
  const { session } = useSession()!;
  const user = JSON.parse(session!);

  const [favorites, setFavorites] = React.useState<FavoriteItem[]>([]);

  useEffect(() => {
    handleGetFavorites();

    return () => {
      setFavorites([]);
    };
  }, [pathname]);

  const handleGetFavorites = React.useCallback(async () => {
    const data = await getFavoritesData(user.access);

    if (data && data.results) {
      setFavorites(data.results);
    } else {
      setFavorites([]);
    }
  }, []);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="mt-8">
        <Image
          width={231}
          height={238}
          source={require("../../../assets/images/general/favorite.png")}
          className="w-[231px] h-[238px] mx-auto"
        />
      </View>
      <View className="mt-10 px-5 gap-y-6">
        {favorites.length > 0 ? (
          favorites.map((item, index) => (
            <FavoriteItemFC
              key={index}
              item={item}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))
        ) : (
          <View className="flex items-center justify-center">
            <NunitoBoldText
              style={{
                fontSize: 19,
                color: "#292825",
              }}
            >
              Oppss!
            </NunitoBoldText>
            <NunitoText
              style={{
                color: "#292825",
                fontSize: 14,
              }}
            >
              Favoritlər siyahınızda heç bir məhsul yoxdur
            </NunitoText>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function FavoriteItemFC({
  item,
  favorites,
  setFavorites,
}: {
  item: FavoriteItem;
  favorites: FavoriteItem[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}) {
  const handleRemoveFavorite = React.useCallback(async (productId: number) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/products/favorite/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzMzk5MTUyLCJpYXQiOjE3MDMzMTI3NTIsImp0aSI6IjA1NmYyMjY4NTRjNjRhYjRiODMwZTIzODNmNjI4M2IzIiwidXNlcl9pZCI6MTMxfQ.HrZUtHMSkNc69ycJlpLlT_rx46LOnOWHdg5n531hyCk`,
          },
          body: JSON.stringify({
            product_id: productId,
          }),
        }
      );
      const data = await response.json();

      if (data.status) {
        alert("Məhsul favoritlərdən silindi");
        const newFavorites = favorites.filter(
          (item) => item.product.id !== productId
        );
        setFavorites(newFavorites);
        return;
      }
      alert("Məhsul favoritlərdən silinərkən xəta baş verdi");
    } catch (error) {
      console.error(error);
      alert("Məhsul favoritlərdən silinərkən xəta baş verdi");
    }
  }, []);

  return (
    <Link
      href={`/(app)/products/${item.product.slug}`}
      className="flex-row justify-between"
      asChild
    >
      <Pressable>
        <Image
          width={80}
          height={80}
          resizeMode="contain"
          className="w-[80px] h-[80px] border"
          source={{
            uri: item.product.image,
          }}
        />
        <View className="flex-1 ml-5">
          <NunitoBoldText numberOfLines={2}>{item.product.name}</NunitoBoldText>
          <NunitoText className="text-[#646260]">
            {item.product.category[0].name}
          </NunitoText>
          <NunitoBoldText numberOfLines={2}>
            ₼{" "}
            {item.product.is_discount
              ? item.product.discount_price
              : item.product.price}{" "}
            {item.product.is_discount && (
              <NunitoText className="text-[#646260] line-through">
                ₼ {item.product.price}
              </NunitoText>
            )}
          </NunitoBoldText>
        </View>

        <View className="justify-between">
          <Pressable
            onPress={() => {
              handleRemoveFavorite(item.product.id);
            }}
            className="w-[30px] h-[30px] bg-[#B6B3D3] rounded-[10px] flex items-center justify-center"
          >
            <Ionicons name="trash" size={20} color="white" />
          </Pressable>
          <Pressable className="w-[30px] h-[30px] bg-[#B6B3D3] rounded-[10px] flex items-center justify-center">
            <Ionicons name="cart-outline" size={22} color="white" />
          </Pressable>
        </View>
      </Pressable>
    </Link>
  );
}
