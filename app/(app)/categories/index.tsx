import { View, ScrollView } from "react-native";
import React from "react";
import CategoryCard from "../../../components/category-card";
import { CategoryItem } from "../../../lib/definations";
import { NunitoBoldText } from "../../../components/StyledText";

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

export default function CategoriesScreen() {
  const [categories, setCategories] = React.useState<CategoryItem[]>([]);

  React.useEffect(() => {
    handleGetCategories();
  }, []);

  const handleGetCategories = async () => {
    const data = await getCategories();

    if (data) {
      setCategories(data);
    } else {
      setCategories([]);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white pt-6 px-5"
      contentContainerClassName="gap-y-5 pb-10"
    >
      {categories.length > 0 ? (
        categories.map((item) => <CategoryCard key={item.id} item={item} />)
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
