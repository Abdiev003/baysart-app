import { View, TextInput, Pressable } from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  NunitoBoldText,
  NunitoExtraBoldText,
  NunitoLightText,
  NunitoText,
} from "../../components/StyledText";
import { Formik } from "formik";
import { router } from "expo-router";
import { useSession } from "../../providers/auth-provider";

export default function SignInScreen() {
  const { signIn } = useSession()!;

  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log(values);

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/accounts/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );

      const data = await response.json();

      if (!data.access) {
        alert("İstifadəçi adı və ya parol səhvdir");
        return;
      }

      const userData = JSON.stringify(data);
      signIn(userData);
      router.push("/(app)/(tabs)/");
    } catch (error) {
      console.log(error);
      alert("Xəta baş verdi");
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          router.push("/(app)/(tabs)/");
        }}
        className="w-full items-end pr-5"
      >
        <Feather name="x" size={24} color="black" />
      </Pressable>
      <View className="items-center mt-6">
        <View className="w-[103px] h-[103px] bg-[#9A8DE5] rounded-full items-center justify-center">
          <Ionicons name="cart-outline" size={56} color="white" />
        </View>
        <NunitoExtraBoldText
          style={{
            fontSize: 28,
          }}
        >
          Xoş gəlmisiniz
        </NunitoExtraBoldText>
        <NunitoLightText className="text-[#0D0D0D]">
          Davam etmək üçün daxil olun
        </NunitoLightText>
      </View>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "Email tələb olunur";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
              values.email.trim()
            )
          ) {
            errors.email = "Yanlış email ünvanı";
          }
          if (!values.password) {
            errors.password = "Parol tələb olunur";
          }
          return errors;
        }}
      >
        {({ setValues, values, errors, handleSubmit }) => (
          <View className="mt-9 px-9">
            <View className="mb-4">
              <TextInput
                className="w-full h-14 px-4 text-base leading-5 border-[0.7px] border-[#d0d0d0] rounded-lg"
                id="email"
                autoCapitalize="none"
                placeholder="E-poçtunuzu daxil edin"
                onChange={(e) => {
                  setValues({ ...values, email: e.nativeEvent.text });
                }}
              />
              {errors.email && (
                <NunitoLightText className="text-red-600">
                  {errors.email}
                </NunitoLightText>
              )}
            </View>
            <View className="mb-4">
              <TextInput
                className="w-full h-14 px-4 text-base leading-5 border-[0.7px] border-[#d0d0d0] rounded-lg"
                id="password"
                placeholder="Şifrənizi daxil edin"
                secureTextEntry={true}
                onChange={(e) => {
                  setValues({ ...values, password: e.nativeEvent.text });
                }}
              />
              {errors.password && (
                <NunitoLightText className="text-red-600">
                  {errors.password}
                </NunitoLightText>
              )}
            </View>

            <Pressable
              onPress={() => handleSubmit()}
              className="w-full mt-9 justify-center items-center h-12 bg-[#574FA0] rounded-lg"
            >
              <NunitoBoldText className="text-white">Daxil ol</NunitoBoldText>
            </Pressable>
          </View>
        )}
      </Formik>

      <View className="mt-9 px-9">
        <Pressable
          onPress={() => {
            router.push("/(auth)/sign-up");
          }}
          className="w-full justify-center items-center h-12 mt-4"
        >
          <NunitoText>Hesabınız yoxdur?</NunitoText>
          <NunitoExtraBoldText className="text-[#574FA0]">
            Qeydiyyat
          </NunitoExtraBoldText>
        </Pressable>
      </View>
    </View>
  );
}
