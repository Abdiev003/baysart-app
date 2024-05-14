import { View, ScrollView } from "react-native";
import React from "react";

import Categories from "../../../components/categories";
import { CategoryItem, CollectionItem } from "../../../lib/definations";
import Collections from "../../../components/collection";

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
  const [categories, setCategories] = React.useState<CategoryItem[]>([]);
  const [collections, setCollections] = React.useState<CollectionItem[]>([]);

  React.useEffect(() => {
    handleGetCategories();
    handleGetCollections();
  }, []);

  const handleGetCategories = async () => {
    try {
      const data = await getCategories();
      if (data) {
        setCategories(data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error(error);
      setCategories([]);
    }
  };

  const handleGetCollections = async () => {
    try {
      const data = await getCollections();
      if (data && data.results.length > 0) {
        setCollections(data.results);
      } else {
        setCollections([]);
      }
    } catch (error) {
      console.error(error);
      setCollections([]);
    }
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
    >
      {/* <Carousel data={carouselData} backArrow={false} /> */}
      <View className="pl-[21px]">
        <Categories data={categories} />
        <Collections data={collections} />
      </View>
    </ScrollView>
  );
}
