import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";

import { Formik } from "formik";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AutocompleteInput from "../../../../../components/auto-complate";
import {
  NunitoBoldText,
  NunitoLightText,
} from "../../../../../components/StyledText";
import { router } from "expo-router";
import { useSession } from "../../../../../providers/auth-provider";

export default function AddressCreateScreen() {
  const { session } = useSession()!;
  const user = JSON.parse(session!);

  const [query, setQuery] = React.useState<any>(false);
  const [latitude, setLatitude] = React.useState<number | null>(null);
  const [longitude, setLongitude] = React.useState<number | null>(null);

  React.useEffect(() => {
    const fetchData = async (placeId: string) => {
      const result = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyA1LM_4IFQWYxlhUCs6KHS4aag2Xax1X5o`
      );

      const data = await result.json();

      if (data.status === "OK") {
        const location = data.result.geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);
      }
    };

    if (query) {
      fetchData(query.place_id);
    }
  }, [query]);

  const onSubmit = async (values: any) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/accounts/address/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`,
          },
          body: JSON.stringify({
            title: values.title,
            address: values.address,
            city: values.city,
            phone_number: values.phone,
            zip: values.postCode,
            lat: latitude as number,
            long: longitude as number,
          }),
        }
      );

      const data = await response.json();

      if (data) {
        router.back();
        alert("Ünvan yaradıldı");
      }
    } catch (error) {
      alert("Xəta baş verdi. Zəhmət olmasa biraz sonra yenidən cəhd edin.");
    }
  };

  return (
    <View className="flex-1 bg-white pt-6">
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          title: "",
          address: "",
          phone: "",
          city: "",
          postCode: "",
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.title) {
            errors.title = "Başlıq boş ola bilməz";
          }

          if (!values.address) {
            errors.address = "Ünvan boş ola bilməz";
          }

          if (!values.phone) {
            errors.phone = "Telefon boş ola bilməz";
          }

          if (!values.city) {
            errors.city = "Şəhər boş ola bilməz";
          }

          if (!values.postCode) {
            errors.postCode = "Poçt kodu boş ola bilməz";
          }

          return errors;
        }}
      >
        {({ handleSubmit, errors, values, setValues }) => (
          <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                className="h-full flex"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="px-5"
              >
                <View className="mb-4">
                  <TextInput
                    className="w-full h-14 px-4 text-base leading-5 border-[0.7px] border-[#d0d0d0] rounded-lg"
                    id="title"
                    placeholder="Başlıq"
                    onChange={(e) => {
                      setValues({ ...values, title: e.nativeEvent.text });
                    }}
                  />
                  {errors.title && (
                    <NunitoLightText className="text-red-600">
                      {errors.title}
                    </NunitoLightText>
                  )}
                </View>
                <View className="mb-4">
                  <AutocompleteInput name="address" setQuery={setQuery} />
                  {errors.address && (
                    <NunitoLightText className="text-red-600">
                      {errors.address}
                    </NunitoLightText>
                  )}
                </View>
                <View className="mb-4">
                  <TextInput
                    className="w-full h-14 px-4 text-base leading-5 border-[0.7px] border-[#d0d0d0] rounded-lg"
                    id="phone"
                    placeholder="Telefon nömrəsi"
                    onChange={(e) => {
                      setValues({ ...values, phone: e.nativeEvent.text });
                    }}
                  />
                  {errors.phone && (
                    <NunitoLightText className="text-red-600">
                      {errors.phone}
                    </NunitoLightText>
                  )}
                </View>
                <View className="mb-4">
                  <TextInput
                    className="w-full h-14 px-4 text-base leading-5 border-[0.7px] border-[#d0d0d0] rounded-lg"
                    id="city"
                    placeholder="Şəhər"
                    onChange={(e) => {
                      setValues({ ...values, city: e.nativeEvent.text });
                    }}
                  />
                  {errors.city && (
                    <NunitoLightText className="text-red-600">
                      {errors.city}
                    </NunitoLightText>
                  )}
                </View>
                <View className="mb-4">
                  <TextInput
                    className="w-full h-14 px-4 text-base leading-5 border-[0.7px] border-[#d0d0d0] rounded-lg"
                    id="postCode"
                    placeholder="Poçt kodu"
                    onChange={(e) => {
                      setValues({ ...values, postCode: e.nativeEvent.text });
                    }}
                  />
                  {errors.postCode && (
                    <NunitoLightText className="text-red-600">
                      {errors.postCode}
                    </NunitoLightText>
                  )}
                </View>

                <Pressable
                  onPress={() => handleSubmit()}
                  className="w-full mt-9 justify-center items-center h-12 bg-[#574FA0] rounded-lg"
                >
                  <NunitoBoldText className="text-white">
                    Yadda saxla
                  </NunitoBoldText>
                </Pressable>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
}
