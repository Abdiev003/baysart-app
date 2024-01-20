import { Image, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

import { NunitoBoldText } from "./StyledText";
import { CategoryItem } from "../lib/definations";

interface CategoryCardProps {
  item: CategoryItem;
}

export default function CategoryCard({ item }: CategoryCardProps) {
  const colors = ["#D8DED5", "#D2D4DC", "#D5DADE", "#E5E5E5", "#DBD5DE"];

  const href =
    item.children.length > 0
      ? `/(app)/categories/${item.slug}`
      : `/(app)/products?category=${item.slug}`;

  return (
    <Link href={href as any} asChild>
      <Pressable
        className="w-full min-h-[128px] rounded-lg pl-6 flex-row items-center justify-between"
        style={{
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        }}
      >
        <NunitoBoldText className="w-1/2">{item.name}</NunitoBoldText>
        <Image
          source={{
            uri: item.image,
          }}
          className="w-[157px] rounded-lg h-full"
        />
      </Pressable>
    </Link>
  );
}
