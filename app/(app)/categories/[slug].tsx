import { View, ScrollView } from "react-native";
import React from "react";
import CategoryCard from "../../../components/category-card";
import { CategoryItem } from "../../../lib/definations";
import { NunitoBoldText } from "../../../components/StyledText";
import { useLocalSearchParams } from "expo-router";

async function getCategories(slug: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/categories/${slug}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
}

export default function CategoryDetailScreen() {
  const params = useLocalSearchParams();

  const [categories, setCategories] = React.useState<CategoryItem | null>(null);

  React.useEffect(() => {
    setCategories(null);
    handleGetCategories();
  }, [params.slug]);

  const handleGetCategories = async () => {
    const data = await getCategories(params.slug as string);

    if (data) {
      setCategories(data);
    } else {
      setCategories(null);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white pt-6 px-5"
      contentContainerClassName="gap-y-5 pb-10"
    >
      {categories && categories.children.length > 0 ? (
        categories.children.map((item) => (
          <CategoryCard key={item.id} item={item} />
        ))
      ) : (
        <View>
          <NunitoBoldText style={{ color: "#574FA0", fontSize: 14 }}>
            Yüklənir...
          </NunitoBoldText>
        </View>
      )}
    </ScrollView>
  );
}
