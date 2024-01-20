import { Pressable, View } from "react-native";
import React from "react";
import StepIndicator from "react-native-step-indicator";

import { NunitoText } from "./StyledText";
import { Link } from "expo-router";

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

interface OrderCardProps {
  item: any;
}

export default function OrderCard({ item }: OrderCardProps) {
  const [currentPosition] = React.useState(0);

  return (
    <Link href="/(app)/(tabs)/profile/orders/1" asChild>
      <Pressable className="w-full border-b border-[#DDD] mb-5 pb-5">
        <View className="flex-row items-center justify-between">
          <NunitoText className="text-sm">Order ID: 2324252627</NunitoText>
          <NunitoText className="text-[#828282]">
            {new Date().toLocaleDateString("az-AZ", {
              day: "numeric",
              month: "long",
            })}
          </NunitoText>
        </View>

        <View className="w-full mt-6">
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            stepCount={4}
          />
        </View>
      </Pressable>
    </Link>
  );
}
