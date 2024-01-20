import { View } from "react-native";
import React from "react";
import { NunitoBoldText } from "./StyledText";
import { Link } from "expo-router";
import { CollectionItem } from "../lib/definations";
import ProductCard from "./product-card";

interface CollectionsProps {
  data: CollectionItem[];
}

export default function Collections({ data }: CollectionsProps) {
  return (
    <View>
      {data.length > 0 ? (
        data.map((collection) => (
          <View key={collection.id} className="pt-2 pr-5">
            <View className="flex-row justify-between items-center">
              <NunitoBoldText
                style={{
                  fontSize: 20,
                }}
                className="ml-0 max-w-xs"
              >
                {collection.title}
              </NunitoBoldText>
              <Link
                href={
                  `/(app)/products?collectionName=${collection.title}&collectionSlug=${collection.slug}` as any
                }
                replace={false}
                asChild
              >
                <NunitoBoldText
                  style={{
                    fontSize: 14,
                    color: "#574FA0",
                  }}
                >
                  Hamısına bax
                </NunitoBoldText>
              </Link>
            </View>
            <View className="pt-2 gap-y-4">
              {collection.products.length > 0 ? (
                collection.products.map((product) => (
                  <ProductCard key={product.id} item={product} />
                ))
              ) : (
                <View>
                  <NunitoBoldText style={{ color: "#574FA0", fontSize: 14 }}>
                    Yüklənir...
                  </NunitoBoldText>
                </View>
              )}
            </View>
          </View>
        ))
      ) : (
        <View>
          <NunitoBoldText style={{ color: "#574FA0", fontSize: 14 }}>
            Yüklənir...
          </NunitoBoldText>
        </View>
      )}
    </View>
  );
}
