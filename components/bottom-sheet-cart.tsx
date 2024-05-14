import { Pressable, ScrollView, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { NunitoBoldText, NunitoText } from "./StyledText";
import { Link, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { UserAddress } from "../lib/definations";
import { useSession } from "../providers/auth-provider";

interface BottomSheetCartProps {
  addresses: UserAddress[];
  totalPrice: number;
  subTotalPrice: number;
  checkoutId: number;
  setShowSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BottomSheetCart({
  addresses,
  totalPrice,
  subTotalPrice,
  checkoutId,
  setShowSheet,
}: BottomSheetCartProps) {
  const pathname = usePathname();
  const { session } = useSession()!;
  const user = JSON.parse(session!);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [success, setSuccess] = React.useState(false);
  const [orderId, setOrderId] = React.useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = React.useState<string | null>(
    null
  );

  // variables
  const snapPoints = useMemo(() => ["1%", "90%", "100%"], []);

  const handleSubmit = useCallback(async () => {
    if (selectedAddress === null) {
      alert("Zəhmət olmasa ünvan seçin");
      return;
    }

    const orderData = {
      email: user.email,
      payment_gateway: "PAYCASH",
      shipping_address: selectedAddress,
      billing_address: selectedAddress,
      payment_method: "CSH",
      // ! Hardcoded
      shipping_method_price: 0,
      sub_total_price: subTotalPrice,
      total_price: totalPrice,
      checkout_id: checkoutId,
      order_verify_by_call: true,
      taksit: false,
      taksit_monthly_payment: 0,
      taksit_months: 0,
      lang: "AZ",
      delivery_status: "PENDING",
    };

    try {
      const response = await fetch(
        `https://api.baysart.com/api/v1.0/payment/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (data && data.url) {
        setSuccess(true);
        setOrderId(orderId);
        setTimeout(() => {
          bottomSheetRef.current?.close();
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      alert("Xəta baş verdi");
    }
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      setShowSheet(false);
    }
  }, []);

  return (
    <View className="flex-1 p-6">
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        index={1}
        snapPoints={snapPoints}
      >
        {success ? (
          <View className="flex-1 items-center justify-center">
            <NunitoBoldText className="text-[#574FA0] text-2xl">
              Sifarişiniz qəbul olundu
            </NunitoBoldText>
            <NunitoText className="text-[#574FA0] text-xl">
              Sifariş nömrəsi: {orderId}
            </NunitoText>
          </View>
        ) : (
          <ScrollView className="flex-1 pl-5">
            <NunitoBoldText
              style={{
                fontSize: 17,
              }}
            >
              ₼ {totalPrice.toFixed(2)}
            </NunitoBoldText>

            <NunitoBoldText>
              QEYD: Hal hazırda ödənişlər yalnız qapıda ödəmə olaraq mövcuddur.
            </NunitoBoldText>

            <View className="my-4 flex-row items-center justify-between pr-5">
              <NunitoBoldText
                style={{
                  fontSize: 17,
                }}
              >
                Mənim ünvanım
              </NunitoBoldText>
              <Link
                href={`/(app)/(tabs)/profile/addresses?back=${pathname}` as any}
                asChild
              >
                <Pressable
                  onPress={() => {}}
                  className="w-10 h-[30px] bg-[#574FA0] rounded-[5px] items-center justify-center"
                >
                  <Ionicons name="add" size={24} color="white" />
                </Pressable>
              </Link>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-x-3"
            >
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <Pressable
                    onPress={() => {
                      setSelectedAddress(address.address);
                    }}
                    key={address.id}
                    className={`border w-[335px] min-h-[100px] px-5 py-2.5 rounded-xl ${
                      selectedAddress?.id === address.id
                        ? "border-[#574FA0]"
                        : "border-[#E5E5E5]"
                    }`}
                  >
                    <NunitoBoldText>{address.title}</NunitoBoldText>
                    <NunitoText>{address.address}</NunitoText>
                    <NunitoText>{address.zip}</NunitoText>
                    <NunitoText>{address.phone_number}</NunitoText>
                  </Pressable>
                ))
              ) : (
                <View className="flex-1 items-center justify-center w-full">
                  <NunitoText>Heç bir ünvanınız yoxdur</NunitoText>
                </View>
              )}
            </ScrollView>
            <View className="pr-5">
              <Pressable
                onPress={handleSubmit}
                className="w-full mt-9 justify-center items-center h-12 bg-[#574FA0] rounded-lg"
              >
                <NunitoBoldText className="text-white">
                  Təsdiq et
                </NunitoBoldText>
              </Pressable>
            </View>
          </ScrollView>
        )}
      </BottomSheet>
    </View>
  );
}
