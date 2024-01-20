import { ScrollView, FlatList } from "react-native";
import React, { useEffect } from "react";
import OrderCard from "../../../../../components/order-card";
import { useSession } from "../../../../../providers/auth-provider";
import { usePathname } from "expo-router";
import { NunitoBoldText } from "../../../../../components/StyledText";
import { View } from "../../../../../components/Themed";

async function getOrdersData(token: string) {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export default function OrdersScreen() {
  const { session } = useSession()!;
  const pathname = usePathname();
  const user = JSON.parse(session!);

  const [orders, setOrders] = React.useState<any[]>([]);

  useEffect(() => {
    handleGetOrders();

    return () => {
      setOrders([]);
    };
  }, [pathname]);

  const handleGetOrders = React.useCallback(async () => {
    const data = await getOrdersData(user.access);

    if (data && data.results) {
      setOrders(data.results);
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <ScrollView className="mt-12 px-6">
      <FlatList
        data={[{ id: 1 }]}
        renderItem={({ item }) => <OrderCard item={item} />}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <NunitoBoldText className="text-xl">
              Sifariş tapılmadı
            </NunitoBoldText>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
}
