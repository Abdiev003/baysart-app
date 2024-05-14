import { View, TextInput, Pressable, Alert, ToastAndroid } from "react-native";
import React from "react";
import { Formik } from "formik";
import { NunitoBoldText } from "../../../../components/StyledText";
import { useSession } from "../../../../providers/auth-provider";
import { useRouter } from "expo-router";

export default function EditScreen() {
  const router = useRouter();
  const { session, signOut } = useSession()!;
  const user = JSON.parse(session!);

  const handleDeleteAccount = () =>
    Alert.alert("Hesabı sil", "Hesabınızı silmək istədiyinizdən əminsiniz?", [
      {
        text: "İmtina et",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Sil",
        onPress: async () => {
          signOut();
          router.push("/(app)/(tabs)");

          await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/accounts/useraccount-delete/`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${user.access}`,
              },
            }
          );
        },
      },
    ]);

  return (
    <View className="border mt-8 mx-5 px-5 py-7 rounded-[20px] border-[#ddd]">
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          phone: user.phone,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <View className="gap-y-5">
            <TextInput
              id="name"
              placeholder="Ad Soyad"
              className="py-[13px] px-5 border border-[#ddd] rounded-[10px]"
              value={values.name}
            />
            <TextInput
              id="email"
              placeholder="E-poçta"
              className="py-[13px] px-5 border border-[#ddd] rounded-[10px]"
              value={values.email}
            />
            <TextInput
              id="phone"
              placeholder="Telefon"
              className="py-[13px] px-5 border border-[#ddd] rounded-[10px]"
              value={values.phone}
            />

            <Pressable className="w-full mt-9 justify-center items-center h-12 bg-[#574FA0] rounded-lg">
              <NunitoBoldText className="text-white">
                Yadda saxla
              </NunitoBoldText>
            </Pressable>
          </View>
        )}
      </Formik>

      <Pressable
        onPress={handleDeleteAccount}
        className="w-full mt-9 justify-center items-center h-12 bg-red-600 rounded-lg"
      >
        <NunitoBoldText className="text-white">Hesabı sil</NunitoBoldText>
      </Pressable>
    </View>
  );
}
