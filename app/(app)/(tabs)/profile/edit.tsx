import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Formik } from "formik";
import { NunitoBoldText } from "../../../../components/StyledText";
import { useSession } from "../../../../providers/auth-provider";

export default function EditScreen() {
  const { session } = useSession()!;
  const user = JSON.parse(session!);

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
    </View>
  );
}
