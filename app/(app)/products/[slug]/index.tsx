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
import BottomSheet from "@gorhom/bottom-sheet";
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

async function getProduct(slug: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/products/${slug}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return null;
}

async function getRelatedProducts(category: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/products?category=${category}`
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
  const user = JSON.parse(session!);

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ["50%", "80%"], []);

  const [product, setProduct] = React.useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = React.useState<ProductItem[]>(
    []
  );

  const handleGetProduct = async () => {
    const data = await getProduct(params.slug as string);

    if (data) {
      setProduct(data);
      handleGetRelatedProducts(data);
    } else {
      setProduct(null);
    }
  };

  const handleGetRelatedProducts = async (item: any) => {
    const data = await getRelatedProducts(item.category[0].slug);

    if (data && data.results.length > 0) {
      setRelatedProducts(data.results);
    }
  };

  const handleAddFavorite = async () => {
    console.log('sec')
    if (!session) {
      alert("Məhsulu seçilmişlərə əlavə etmək üçün giriş etməlisiniz");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/products/favorite/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`,
          },
          body: JSON.stringify({
            product_id: product?.id,
          }),
        }
      );

      console.log(response);

      const data = await response.json();

      console.log(data);

      if (data.status) {
        alert("Məhsul seçilmişlərə əlavə olundu");
        return;
      }

      alert("Məhsul seçilmişlərə əlavə olunmadı");
    } catch (error) {
      console.log(error);
      alert("Məhsul seçilmişlərə əlavə olunmadı");
    }
  };

  const handleAddCart = async () => {
    if (!session) {
      alert("Məhsulu səbətə əlavə etmək üçün giriş etməlisiniz");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/checkout-lines/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`,
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
      console.log(error);
      alert("Məhsul səbətə əlavə olunmadı");
    }
  };

  React.useEffect(() => {
    handleGetProduct();
  }, [params]);

  if (!product) {
    return null;
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
          boxShadow: "3px 3px 18px 0px rgba(0, 0, 0, 0.25)",
        }}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
      >
        <ScrollView
          contentContainerClassName="pb-96"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={handleAddFavorite}
            className="w-[52px] h-[52px] bg-[#574FA0] items-center justify-center absolute z-10 right-[94px] top-0 rounded-full"
          >
            <Ionicons name="heart" size={30} color="white" />
          </TouchableOpacity>
          <Pressable className="w-[52px] h-[52px] bg-[#574FA0] items-center justify-center absolute right-[30px] top-0 rounded-full">
            <Ionicons name="share-social" size={30} color="white" />
          </Pressable>
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

            <View className="pr-[22px] gap-y-3">
              <NunitoBoldText className="text-[15px] text-[#8A8A8A]">
                Satıcı: {product.store_business_name}
              </NunitoBoldText>
              <NunitoLightText numberOfLines={4}>
                {product.description}
              </NunitoLightText>

              <NunitoText className="text-[15px] text-[#8A8A8A]">
                Brend :{" "}
                <NunitoBoldText className="text-[#574FA0]">
                  {product.brand}
                </NunitoBoldText>
              </NunitoText>

              <NunitoText className="text-[15px] text-[#8A8A8A]">
                Baxış sayı :{" "}
                <NunitoBoldText className="text-[#574FA0]">
                  {product.view_count}
                </NunitoBoldText>
              </NunitoText>

              <NunitoText className="text-[15px] text-[#8A8A8A]">
                Məhsul kodu :{" "}
                <NunitoBoldText className="text-[#574FA0]">
                  {product.sku}
                </NunitoBoldText>
              </NunitoText>
            </View>

            <View className="border-b-[0.5px] border-[#ACA7A7] flex-row items-center justify-between mt-4 py-2 mr-[22px]">
              <NunitoMediumText className="text-[#1E3354]">
                Məhsulun Təsviri
              </NunitoMediumText>
            </View>

            <View className="mt-5">
              <SomeProduct
                main_product_id={product.main_product_id}
                color={product.color.id}
              />
            </View>

            {relatedProducts && relatedProducts.length ? (
              <View className="mt-5">
                <Text>Oxşar Məhsullar</Text>
                <FlatList
                  data={relatedProducts.slice(0, 10)}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        width: Dimensions.get("window").width - 20,
                        paddingRight: 26,
                      }}
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
        </ScrollView>
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
