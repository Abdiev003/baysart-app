import { View, ScrollView } from "react-native";
import React from "react";
import { getItemAsync, setItemAsync } from "expo-secure-store";

import Carousel from "../../../components/carousel";
import Categories from "../../../components/categories";
import {
  CategoryItem,
  CollectionItem,
  SliderItem,
} from "../../../lib/definations";
import Collections from "../../../components/collection";

async function getCarouselData() {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/core/sliders/`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
}

async function getCategories() {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/categories-all/`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
}

async function getCollections() {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/core/collections/?limit=8`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export default function HomeScreen() {
  const [carouselData, setCarouselData] = React.useState<SliderItem[]>([]);
  const [categories, setCategories] = React.useState<CategoryItem[]>([]);
  const [collections, setCollections] = React.useState<CollectionItem[]>([]);

  React.useEffect(() => {
    handleGetCarouselData();
    handleGetCategories();
    handleGetCollections();
  }, []);

  const handleGetCarouselData = async () => {
    const cachedCarouselData = await getItemAsync("carouselData");
    if (cachedCarouselData) {
      setCarouselData(JSON.parse(cachedCarouselData));
    }

    const data = await getCarouselData();

    if (data.data) {
      setCarouselData(data.data);
      setItemAsync("carouselData", JSON.stringify(data.data));
    } else {
      setCarouselData([]);
    }
  };

  const handleGetCategories = async () => {
    const data = await getCategories();
    if (data) {
      setCategories(data);
    } else {
      setCategories([]);
    }
  };

  const handleGetCollections = async () => {
    const data = await getCollections();
    if (data && data.results.length > 0) {
      setCollections(data.results);
    } else {
      setCollections([]);
    }
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Categories data={categories} />
        <Collections data={collections} />
      </View>
    </ScrollView>
  );
}
