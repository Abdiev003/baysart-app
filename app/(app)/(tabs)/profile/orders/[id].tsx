import { View, ScrollView } from "react-native";
import React from "react";
import StepIndicator from "react-native-step-indicator";

import {
  NunitoBoldText,
  NunitoText,
} from "../../../../../components/StyledText";
import Carousel from "../../../../../components/carousel";

const labels = ["Təsdiq edildi", "Hazırlanır", "Göndərilib", "Çatdırıldı"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: "#4044AA",
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: "#4044AA",
  stepStrokeUnFinishedColor: "#DDDDDD",
  separatorFinishedColor: "#4044AA",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#4044AA",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#4044AA",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 14,
  currentStepLabelColor: "#4044AA",
};

export default function OrderDetailScreen() {
  const [currentPosition, setCurrentPosition] = React.useState(0);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="mt-[30px] mx-6 border border-[#ddd] rounded-[20px]"
      contentContainerClassName="pl-4 pt-5 pr-[18px] pb-6"
    >
      <NunitoBoldText className="text-base">
        Order ID #2324252627
      </NunitoBoldText>

      <View className="flex-row justify-between h-[200px]">
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          direction="vertical"
          stepCount={4}
        />
      </View>

      <NunitoBoldText className="text-base mt-8">
        Məhsul məlumatları
      </NunitoBoldText>

      <Carousel
        detail
        backArrow={false}
        data={[
          {
            id: 1,
            image:
              "https://fastly.picsum.photos/id/698/500/500.jpg?hmac=uxgzs7vncEwTz_EgnEYOKyHj2OnHrgwu4DzufJlkNTY",
          },
        ]}
      />

      <NunitoBoldText className="mt-8">
        TLF Cotton T-Shirt Cotton
      </NunitoBoldText>
      <NunitoText className="text-[#8A8A8A]">
        Kateqoriya : <NunitoText className="text-[#574FA0]">Geyim</NunitoText>
      </NunitoText>

      <View className="flex-row hfull items-center justify-between border-t my-4 border-[#ddd] pt-2">
        <NunitoText>Ümumi Məbləğ</NunitoText>
        <NunitoText>₼ 89.00</NunitoText>
      </View>
    </ScrollView>
  );
}
