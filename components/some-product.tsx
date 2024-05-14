import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

interface SomeProductProps {
  main_product_id: number;
  color: number;
}

const SomeProduct: React.FC<SomeProductProps> = ({
  main_product_id,
  color,
}) => {
  const [variants, setVariants] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    handleGetVariants(main_product_id, color);
  }, []);

  const getLink = (slug: string) => {
    router.push(`/(app)/products/${slug}/`);
  };

  const handleGetVariants = async (id: number, color: number) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/products/${id}/variants?color=${color}`
      );

      const data = await response.json();

      return setVariants(data);
    } catch (error: any) {}
  };
  return (
    <View style={{ width: "100%" }}>
      <View>
        <Text>Digər ölçülər:</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            rowGap: 10,
            marginVertical: 5,
            flexWrap: "wrap",
          }}
        >
          {variants?.same_color?.map((variant: any, key: number) => (
            <TouchableOpacity
              key={key}
              onPress={() => getLink(variant.slug) as any}
            >
              <Text
                style={{
                  borderRadius: 5,
                  // width: "50px",
                  fontSize: 12,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  backgroundColor: "#EEEDF6",
                  borderWidth: 0,
                  marginRight: 10,
                }}
              >
                {variant.size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {variants?.different_color?.length > 0 ? (
        <View className="mt-5">
          <View>
            <Text>Həmçinin mövcuddur:</Text>
          </View>
          <View
            style={{
              maxWidth: "80%",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {variants?.different_color?.map((variant: any, key: number) => (
              <View key={key} className="image-item" style={{ padding: 3.2 }}>
                <TouchableOpacity
                  onPress={() => getLink(variant.slug) as any}
                  className="flex flex-row"
                >
                  <Image
                    source={{ uri: variant.image }}
                    className="object-cover"
                    style={{
                      width: 80,
                      height: 80,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default SomeProduct;
