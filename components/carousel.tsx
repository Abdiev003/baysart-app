import { View, Dimensions, Image, Pressable } from "react-native";
import React from "react";
import CarouselRN from "react-native-reanimated-carousel";
// @ts-ignore
import ImageView from "react-native-image-view";
import { ExternalLink } from "./ExternalLink";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface CarouselProps {
  data: any[];
  detail?: boolean;
  backArrow?: boolean;
}

export default function Carousel({
  data,
  detail = false,
  backArrow = true,
}: CarouselProps) {
  const width = Dimensions.get("window").width;

  const [isImageViewVisible, setIsImageViewVisible] = React.useState(false);

  const images = data.map((item) => ({
    source: {
      uri: item.image,
    },
    title: item.id,
  }));

  return (
    <View className="mt-[22px]">
      {backArrow && (
        <Pressable
          className="w-10 h-10 flex items-center justify-center"
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 50,
            }}
          />
        </Pressable>
      )}

      <CarouselRN
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={data}
        autoPlayInterval={3000}
        scrollAnimationDuration={1000}
        renderItem={({ index }) =>
          detail ? (
            <>
              <Pressable onPress={() => setIsImageViewVisible(true)}>
                <Image
                  source={{ uri: data[index].image }}
                  style={{ width: width, height: "100%" }}
                  resizeMode="contain"
                  width={width}
                />
              </Pressable>

              {/* <ImageView
                glideAlways
                images={images}
                imageIndex={index}
                isVisible={isImageViewVisible}
                animationType="fade"
                onClose={() => setIsImageViewVisible(false)}
              /> */}
            </>
          ) : (
            <ExternalLink
              href={data[index].url}
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: data[index].image }}
                style={{ width: width, height: "100%" }}
                width={width}
              />
            </ExternalLink>
          )
        }
      />
    </View>
  );
}
