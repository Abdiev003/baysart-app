import {
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Carousel from "../../../../components/carousel";
import { ProductDetail, ProductItem } from "../../../../lib/definations";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useSession } from "../../../../providers/auth-provider";
import {
  NunitoBoldText,
  NunitoLightText,
  NunitoMediumText,
  NunitoSemiBoldText,
  NunitoText,
} from "../../../../components/StyledText";
import SomeProduct from "../../../../components/some-product";
import ProductCard from "../../../../components/product-card";
import ProductIcons from "../../../../components/product-icons";

async function getProduct(slug: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/products/${slug}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
}

async function getRelatedProducts(category: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/products/related/?category=${category}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }

  return null;
}

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const { session } = useSession()!;

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ["50%", "80%"], []);

  const [product, setProduct] = React.useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = React.useState<ProductItem[]>(
    []
  );

  const handleGetProduct = async () => {
    try {
      const data = await getProduct(params.slug as string);

      if (data) {
        setProduct(data);
        handleGetRelatedProducts(data);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetRelatedProducts = async (item: any) => {
    try {
      const data = await getRelatedProducts(item.category[0].slug);

      if (data && data.length > 0) {
        setRelatedProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFavorite = async () => {
    if (!session) {
      alert("Məhsulu seçilmişlərə əlavə etmək üçün giriş etməlisiniz");
      return;
    }

    try {
      const user = JSON.parse(session!);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/products/favorite/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`,
          },
          body: JSON.stringify({
            product_id: product?.id,
          }),
        }
      );

      const data = await response.json();

      if (data.status) {
        alert("Məhsul seçilmişlərə əlavə olundu");
        return;
      }

      alert("Məhsul seçilmişlərə əlavə olunmadı");
    } catch (error) {
      alert("Məhsul seçilmişlərə əlavə olunmadı");
    }
  };

  const handleAddCart = async () => {
    if (!session) {
      alert("Məhsulu səbətə əlavə etmək üçün giriş etməlisiniz");
      return;
    }

    try {
      const user = JSON.parse(session!);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/checkout-lines/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`,
          },
          body: JSON.stringify({
            product: product?.id,
            quantity: 1,
          }),
        }
      );

      const data = await response.json();

      if (data) {
        alert("Məhsul səbətə əlavə olundu");
        return;
      }

      alert("Məhsul səbətə əlavə olunmadı");
    } catch (error) {
      alert("Məhsul səbətə əlavə olunmadı");
    }
  };

  React.useEffect(() => {
    handleGetProduct();
  }, [params]);

  if (!product) {
    return (
      <View className="flex-1 bg-white/30 items-center justify-center">
        <Text>Məhsul tapılmadı</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white/30">
      <View className="h-[466px]">
        <Carousel
          data={
            product.images.length > 0
              ? product.images
              : [{ id: product.id, image: product.image }]
          }
          detail
        />
      </View>

      <BottomSheet
        style={{
          flex: 1,
          boxShadow: "3px 3px 18px 0px rgba(0, 0, 0, 0.25)",
        }}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
      >
        <BottomSheetScrollView
          contentContainerClassName="pb-96"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={handleAddFavorite}
            className="w-12 h-12 bg-[#574FA0] items-center justify-center absolute right-[84px] top-0 rounded-full z-10"
          >
            <Ionicons name="heart" size={22} color="white" />
          </Pressable>
          <TouchableOpacity
            onPress={() => {}}
            className="w-12 h-12 bg-[#574FA0] items-center justify-center absolute right-[30px] top-0 rounded-full z-10"
          >
            <Ionicons name="share-social" size={22} color="white" />
          </TouchableOpacity>
          <View className="pl-[26px] pt-3">
            <View className="flex-row items-center gap-x-3">
              <NunitoBoldText className="text-xl">
                ₼{" "}
                {product.is_discount
                  ? Number(product.discount_price).toFixed(2)
                  : Number(product.price).toFixed(2)}
              </NunitoBoldText>
              {product.is_discount && (
                <Text className="text-[#FF0000] text-sm line-through">
                  ₼ {Number(product.price).toFixed(2)}
                </Text>
              )}
            </View>

            <View className="pr-[22px] gap-y-1">
              <NunitoBoldText className="text-[15px] text-[#8A8A8A]">
                Satıcı: {product.store_business_name}
              </NunitoBoldText>
              <NunitoLightText numberOfLines={4}>
                {product.description}
              </NunitoLightText>

              <NunitoText className="text-[13px] text-[#8A8A8A]">
                Kateqoriya :{" "}
                <NunitoBoldText className="text-[#574FA0]">
                  {product.category?.[0]?.name}
                </NunitoBoldText>
              </NunitoText>
              <NunitoText className="text-[13px] text-[#8A8A8A]">
                Baxıldı :{" "}
                <NunitoBoldText className="text-[#574FA0]">
                  {product.view_count} dəfə
                </NunitoBoldText>
              </NunitoText>

              <ProductIcons product={product} />
            </View>

            <View className="flex-col border-b-[0.5px] border-[#ACA7A7] items-start justify-between mt-4 py-2 mr-[22px]">
              <NunitoMediumText className="text-[#1E3354]">
                Məhsulun Təsviri
              </NunitoMediumText>
              <NunitoLightText className="text-sm">
                {product?.description}
              </NunitoLightText>
            </View>

            <View className="mt-5">
              <SomeProduct
                main_product_id={product.main_product_id}
                color={product.color.id}
              />
            </View>

            {relatedProducts && relatedProducts?.length ? (
              <View className="mt-5">
                <Text>Oxşar Məhsullar</Text>
                <FlatList
                  data={relatedProducts.slice(0, 10)}
                  numColumns={2}
                  scrollEnabled={false}
                  columnWrapperClassName="gap-3"
                  renderItem={({ item }) => (
                    <View
                      style={{ width: Dimensions.get("window").width / 2 - 20 }}
                      className="my-2"
                    >
                      <ProductCard item={item} />
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            ) : null}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
        }}
        className="bg-white w-full"
      >
        <Pressable
          onPress={handleAddCart}
          className="flex-row w-full h-[56px] border items-center justify-center rounded-[9px] border-[#574FA0]"
        >
          <NunitoSemiBoldText className="text-[#574FA0] text-[17px] mr-2">
            Səbətə əlavə et
          </NunitoSemiBoldText>
          <Ionicons name="cart" size={24} color="#574FA0" />
        </Pressable>
      </View>
    </View>
  );
}
