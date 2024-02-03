import { View, ScrollView, NativeScrollEvent } from "react-native";
import React, { useRef } from "react";
import { useLocalSearchParams } from "expo-router";

import ProductCard from "../../../components/product-card";
import { ProductItem } from "../../../lib/definations";
import { NunitoBoldText, NunitoText } from "../../../components/StyledText";

async function getProducts(categorySlug?: string) {
  try {
    const response = await fetch(
      categorySlug
        ? `${process.env.EXPO_PUBLIC_API_URL}/products/?category=${categorySlug}`
        : `${process.env.EXPO_PUBLIC_API_URL}/products/`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
}

async function getProductsWithCollection(collectionSlug: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/core/collections/${collectionSlug}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
}

async function getProductsWithPagination(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
}

async function getProductsBySearch(search: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/products/lookup?search=${search}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export default function ProductsScreen() {
  const params = useLocalSearchParams();

  const search = params.search;
  const category = params.category;
  const collectionSlug = params.collectionSlug;

  const scrollRef = useRef<ScrollView>(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const [products, setProducts] = React.useState<ProductItem[]>([]);
  const [productsPaginationInfo, setProductsPaginationInfo] = React.useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

  React.useEffect(() => {
    setProducts([]);
    async function fetchDataAsync() {
      if (collectionSlug) {
        await handleGetProductsByCollection();
      } else if (search) {
        await handleGetProductsBySearch();
      } else {
        await handleGetProducts();
      }

      setIsLoading(false);
    }
    fetchDataAsync();
  }, [category, collectionSlug, search]);

  const handleScroll = async (
    event: React.BaseSyntheticEvent<NativeScrollEvent>
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    if (y + height >= contentHeight - 20) {
      if (!isFetchingMore && productsPaginationInfo.next) {
        setIsFetchingMore(true);
        await handleLoadMore();
        setIsFetchingMore(false);
      }
    }
  };

  const handleGetProducts = async () => {
    const data = await getProducts(category as string);

    if (data && data.results.length > 0) {
      setProducts(data.results);
      setProductsPaginationInfo({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
    } else {
      setProducts([]);
    }
  };

  const handleGetProductsByCollection = async () => {
    const data = await getProductsWithCollection(collectionSlug as string);

    if (data && data.products.length > 0) {
      setProducts(data.products);
    } else {
      setProducts([]);
    }
  };

  const handleGetProductsBySearch = async () => {
    const data = await getProductsBySearch(search as string);

    if (data && data.results.length > 0) {
      setProducts(data.results);
      setProductsPaginationInfo({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
    } else {
      setProducts([]);
    }
  };

  const handleLoadMore = async () => {
    if (productsPaginationInfo.next) {
      const data = await getProductsWithPagination(productsPaginationInfo.next);

      if (data && data.results.length > 0) {
        setProducts([...products, ...data.results]);
        setProductsPaginationInfo({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
      }
    }
  };

  if (isLoading) {
    return (
      <View className="w-full h-full items-center justify-center">
        <NunitoBoldText
          style={{
            fontSize: 19,
            color: "#292825",
          }}
        >
          Yüklənir...
        </NunitoBoldText>
      </View>
    );
  }

  return (
    <ScrollView
    nestedScrollEnabled
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex-1"
      scrollEventThrottle={400}
      contentContainerClassName="flex-grow bg-white"
    >
      {products.length > 0 ? (
        <View className="flex-row mt-8 flex-grow flex-wrap gap-3.5 px-5 pb-10">
          {products.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </View>
      ) : (
        <View className="w-full h-full items-center justify-center">
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
            Axtardığınız məhsul tapılmadı
          </NunitoText>
        </View>
      )}
    </ScrollView>
  );
}
