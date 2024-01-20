import { Image, Pressable, ScrollView } from "react-native";
import React from "react";
import { View } from "../../../components/Themed";
import { NunitoBoldText, NunitoText } from "../../../components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { CartItem, UserAddress } from "../../../lib/definations";
import { Link, usePathname } from "expo-router";
import BottomSheetCart from "../../../components/bottom-sheet-cart";
import { useSession } from "../../../providers/auth-provider";

async function getCartData(token: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/checkout-lines/`,
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

export default function CartScreen() {
  const pathname = usePathname();
  const { session } = useSession()!;
  const user = JSON.parse(session!);

  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [addresses, setAddresses] = React.useState<UserAddress[]>([]);
  const [showSheet, setShowSheet] = React.useState<boolean>(false);

  React.useEffect(() => {
    handleGetCart();
    handleGetAddresses();
  }, [pathname]);

  const handleGetCart = React.useCallback(async () => {
    const data = await getCartData(user.access);

    if (data && data.results) {
      setCart(data.results);
    } else {
      setCart([]);
    }
  }, []);

  const handleGetAddresses = React.useCallback(async () => {
    const data = await getAddresses(user.access);

    if (data && data.results) {
      setAddresses(data.results);
    } else {
      setAddresses([]);
    }
  }, []);

  const totalPrice = React.useMemo(() => {
    return cart.reduce((acc, item) => {
      if (item.product.is_discount) {
        return acc + Number(item.product.discount_price) * item.quantity;
      }
      return acc + Number(item.product.price) * item.quantity;
    }, 0);
  }, [cart]);

  const totalDiscountPrice = React.useMemo(() => {
    return cart.reduce((totalDiscount, item) => {
      const originalPrice = parseFloat(item.product.price);
      const discountedPrice = parseFloat(item.product.discount_price);
      const discount = originalPrice - discountedPrice;
      return totalDiscount + discount * item.quantity;
    }, 0);
  }, [cart]);

  const totalSubPrice = React.useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + Number(item.sub_total);
    }, 0);
  }, [cart]);

  return (
    <>
      <View className="flex-1 flex justify-between">
        <ScrollView
          className="flex-1 bg-white"
          contentContainerClassName="h-full"
        >
          <View>
            {cart.length > 0 ? (
              cart.map((item) => (
                <CartItemFC
                  key={item.id}
                  item={item}
                  cart={cart}
                  setCart={setCart}
                />
              ))
            ) : (
              <View className="flex h-full items-center justify-center">
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
                    textAlign: "center",
                    color: "#292825",
                    fontSize: 14,
                  }}
                >
                  Səbət siyahınızda heç bir məhsul yoxdur. Səbətə məhsul əlavə
                  etmək üçün məhsul kataloquna keçin.
                </NunitoText>
              </View>
            )}
          </View>
        </ScrollView>
        {cart.length > 0 && (
          <View className="bg-white flex-1 h-full pt-2.5 px-5 gap-y-2.5">
            <View className="flex-row items-center justify-between">
              <NunitoText
                style={{
                  fontSize: 16,
                }}
              >
                Ümumi Məhsul
              </NunitoText>
              <NunitoBoldText>{cart.length} məhsul</NunitoBoldText>
            </View>
            <View className="flex-row items-center justify-between">
              <NunitoText
                style={{
                  fontSize: 16,
                }}
              >
                Çatdırılma
              </NunitoText>
              <NunitoBoldText>₼ {Number(0).toFixed(2)}</NunitoBoldText>
            </View>
            <View className="flex-row items-center justify-between">
              <NunitoText
                style={{
                  fontSize: 16,
                }}
              >
                Qiymət
              </NunitoText>
              <NunitoBoldText>₼ {totalSubPrice.toFixed(2)}</NunitoBoldText>
            </View>
            <View className="flex-row items-center justify-between">
              <NunitoText
                style={{
                  fontSize: 16,
                }}
              >
                Endirim
              </NunitoText>
              <NunitoBoldText>₼ {totalDiscountPrice.toFixed(2)}</NunitoBoldText>
            </View>
            <View className="h-1 border-b" />
            <View className="flex-row items-center justify-between">
              <NunitoText
                style={{
                  fontSize: 16,
                }}
              >
                Ümumi Məbləğ
              </NunitoText>
              <NunitoBoldText>₼ {totalPrice.toFixed(2)}</NunitoBoldText>
            </View>

            <Pressable
              onPress={() => {
                setShowSheet(true);
              }}
              className="w-full mt-9 justify-center items-center h-12 bg-[#574FA0] rounded-lg"
            >
              <NunitoBoldText className="text-white">Təsdiq et</NunitoBoldText>
            </Pressable>
          </View>
        )}
      </View>
      {showSheet && (
        <BottomSheetCart
          addresses={addresses}
          totalPrice={totalPrice}
          subTotalPrice={totalSubPrice}
          checkoutId={cart[0].checkout_id}
        />
      )}
    </>
  );
}

function CartItemFC({
  item,
  cart,
  setCart,
}: {
  item: CartItem;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}) {
  const [quantity, setQuantity] = React.useState<number>(item.quantity);

  const handleRemoveCart = React.useCallback(async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/checkout-lines/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzMzk5MTUyLCJpYXQiOjE3MDMzMTI3NTIsImp0aSI6IjA1NmYyMjY4NTRjNjRhYjRiODMwZTIzODNmNjI4M2IzIiwidXNlcl9pZCI6MTMxfQ.HrZUtHMSkNc69ycJlpLlT_rx46LOnOWHdg5n531hyCk`,
          },
        }
      );
      const data = await response.json();

      if (data) {
        alert("Məhsul səbətdən silindi");
        const newCart = cart.filter((item) => item.id !== id);
        setCart(newCart);
        return;
      }
      alert("Məhsul səbətdən silinərkən xəta baş verdi");
    } catch (error) {
      console.error(error);
      alert("Məhsul səbətdən silinərkən xəta baş verdi");
    }
  }, []);

  const handleUpdateCart = React.useCallback(
    async (id: number, quantity: number) => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/checkout-lines/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzMzk5MTUyLCJpYXQiOjE3MDMzMTI3NTIsImp0aSI6IjA1NmYyMjY4NTRjNjRhYjRiODMwZTIzODNmNjI4M2IzIiwidXNlcl9pZCI6MTMxfQ.HrZUtHMSkNc69ycJlpLlT_rx46LOnOWHdg5n531hyCk`,
            },
            body: JSON.stringify({
              product: id,
              quantity: quantity,
            }),
          }
        );
        const data = await response.json();

        if (data) {
          alert("Məhsul sayı yeniləndi");
          return;
        }
        alert("Məhsul sayı yenilənərkən xəta baş verdi");
      } catch (error) {
        console.error(error);
        alert("Məhsul sayı yenilənərkən xəta baş verdi");
      }
    },
    []
  );

  return (
    <View className="flex flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
      <Link href={`/(app)/products/${item.product.slug}`} asChild>
        <Pressable className="flex flex-row items-center">
          <Image
            width={80}
            height={80}
            source={{ uri: item.product.image }}
            className="w-[80px] h-[80px] rounded-lg"
          />
          <View className="ml-4 max-w-44">
            <NunitoBoldText
              numberOfLines={2}
              className="text-base text-gray-800"
            >
              {item.product.name}
            </NunitoBoldText>
            <View className="flex-row items-center gap-x-4">
              <Pressable
                onPress={() => {
                  if (quantity - 1 === 0) {
                    handleRemoveCart(item.id);
                  } else {
                    setQuantity(quantity - 1);
                    handleUpdateCart(item.product.id, quantity - 1);
                  }
                }}
                className="w-[30px] h-[30px] border border-[#DDD] rounded-[10px] flex items-center justify-center"
              >
                <Ionicons name="remove" size={20} color="black" />
              </Pressable>
              <NunitoBoldText>{quantity}</NunitoBoldText>
              <Pressable
                onPress={() => {
                  setQuantity(quantity + 1);
                  handleUpdateCart(item.product.id, quantity + 1);
                }}
                className="w-[30px] h-[30px] border border-[#DDD] rounded-[10px] flex items-center justify-center"
              >
                <Ionicons name="add" size={20} color="black" />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Link>
      <View className="items-end justify-between">
        <Pressable
          onPress={() => {
            handleRemoveCart(item.id);
          }}
          className="w-[30px] h-[30px] bg-[#B6B3D3] rounded-[10px] flex items-center justify-center"
        >
          <Ionicons name="trash" size={20} color="white" />
        </Pressable>
        <NunitoBoldText>
          ₼{" "}
          {item.product.is_discount
            ? Number(item.product.discount_price) * quantity
            : Number(item.product.price) * quantity}{" "}
          x {quantity}
        </NunitoBoldText>
      </View>
    </View>
  );
}
