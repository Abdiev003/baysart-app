import { View, Image, Pressable } from "react-native";
import React from "react";
import { NunitoBoldText } from "./StyledText";
import { ProductItem } from "../lib/definations";
import { Link } from "expo-router";

interface ProductCardProps {
  item: ProductItem;
  href?: string;
}

export default function ProductCard({ item, href = "" }: ProductCardProps) {
  return (
    <Link
      href={href ? href : (`/(app)/products/${item.slug}?` as any)}
      asChild
      replace={false}
      className="min-w-[160px] min-h-[218px] rounded-[20px] flex-grow shadow-sm"
    >
      <Pressable className="min-w-[160px] min-h-[218px] rounded-[20px] flex-grow">
        <Image
          width={160}
          height={146}
          source={{
            uri: item.image,
          }}
          resizeMode="contain"
          className="w-full h-[146px] rounded-tl-[20px] rounded-tr-[20px]"
        />
        <View className="px-5 py-5 bg-[#FFFFFFF2] shadow-card rounded-bl-[20px] rounded-br-[20px] gap-y-2">
          <NunitoBoldText
            style={{
              fontSize: 14,
            }}
          >
            {item.name}
          </NunitoBoldText>
          <NunitoBoldText
            style={{
              fontSize: 14,
            }}
          >
            ₼{" "}
            {Number(
              item.is_discount ? item.discount_price : item.price
            ).toFixed(2)}{" "}
            {item.is_discount && (
              <NunitoBoldText
                style={{
                  fontSize: 14,
                  textDecorationLine: "line-through",
                }}
              >
                ₼ {Number(item.price).toFixed(2)}
              </NunitoBoldText>
            )}
          </NunitoBoldText>
        </View>
      </Pressable>
    </Link>
  );
}
