import { View, Pressable, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";

import { CategoryItem } from "../lib/definations";
import { NunitoBoldText } from "./StyledText";

interface CategoriesProps {
  data: CategoryItem[];
}

function CategoryItemFC({ item }: { item: CategoryItem }) {
  return (
    <Link href={`/(app)/categories/${item.slug}`} asChild>
      <Pressable className="px-8 py-2 max-h-9 items-center justify-center bg-[#DADADA] rounded-lg">
        <NunitoBoldText
          numberOfLines={1}
          style={{ color: "#574FA0", fontSize: 14 }}
        >
          {item.name}
        </NunitoBoldText>
      </Pressable>
    </Link>
  );
}

export default function Categories({ data }: CategoriesProps) {
  return (
    <View>
      <NunitoBoldText
        style={{
          color: "#574FA0",
          fontSize: 14,
          marginTop: 12,
        }}
      >
        Kateqoriyalar
      </NunitoBoldText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="items-center mt-1 gap-x-2"
      >
        <Link href="/(app)/categories" asChild>
          <Pressable className="px-8 py-2 max-w-[108px] items-center justify-center bg-[#574FA0] rounded-lg">
            <NunitoBoldText style={{ color: "white", fontSize: 14 }}>
              Bütün
            </NunitoBoldText>
          </Pressable>
        </Link>
        {data.length > 0 ? (
          data.map((item) => <CategoryItemFC key={item.id} item={item} />)
        ) : (
          <View>
            <NunitoBoldText style={{ color: "#574FA0", fontSize: 14 }}>
              Yüklənir...
            </NunitoBoldText>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
