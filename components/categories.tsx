import {
  View,
  Pressable,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

import { CategoryItem } from "../lib/definations";
import { NunitoBoldText } from "./StyledText";

interface CategoriesProps {
  data: CategoryItem[];
}

function CategoryItemFC({ item }: { item: CategoryItem }) {
  return (
    <Link href={`/(app)/categories/${item.slug}`} asChild className="mr-2">
      <Pressable className="min-h-14 w-[180px] flex-row items-center justify-center bg-gray-200 rounded-tr-lg rounded-br-lg">
        <Image
          className="w-14 h-14 mr-auto"
          source={{ uri: item.image, cache: "force-cache" }}
          resizeMode="cover"
        />
        <View className="px-6">
          <NunitoBoldText
            numberOfLines={1}
            style={{ color: "#574FA0", fontSize: 14 }}
          >
            {item.name}
          </NunitoBoldText>
        </View>
      </Pressable>
    </Link>
  );
}

export default function Categories({ data }: CategoriesProps) {
  return (
    <View>
      <View className="mt-1 gap-x-2 justify-between">
        <Link href={`/(app)/categories`} asChild className="mx-2">
          <Pressable className="h-14 flex-row items-center justify-center bg-[#DADADA] rounded-tr-lg rounded-br-lg">
            <Image
              className="w-14 h-full mr-auto"
              source={{ uri: data[0]?.image, cache: "force-cache" }}
              resizeMode="cover"
            />
            <View className="px-6">
              <NunitoBoldText
                numberOfLines={1}
                style={{ color: "#574FA0", fontSize: 14 }}
              >
                Bütün
              </NunitoBoldText>
            </View>
          </Pressable>
        </Link>
        {data.length > 0 ? (
          <FlatList
            data={data.slice(0, 8)}
            scrollEnabled={false}
            numColumns={2}
            renderItem={({ item }) => (
              <View
                style={{
                  width: Dimensions.get("window").width / 2,
                  paddingLeft: 8,
                }}
                className="my-2"
              >
                <CategoryItemFC key={item.id} item={item} />
              </View>
            )}
          />
        ) : (
          <View>
            <NunitoBoldText style={{ color: "#574FA0", fontSize: 14 }}>
              Yüklənir...
            </NunitoBoldText>
          </View>
        )}
      </View>
    </View>
  );
}
