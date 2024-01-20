import {
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import { Formik } from "formik";
import { UserAddress } from "../../../../../lib/definations";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AutocompleteInput from "../../../../../components/auto-complate";
import { NunitoBoldText } from "../../../../../components/StyledText";
import { useSession } from "../../../../../providers/auth-provider";

async function getAddress(id: number, token: string) {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/accounts/address/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  return null;
}

export default function AddressDetailScreen() {
  const params = useLocalSearchParams();
  const { session } = useSession()!;
  const user = JSON.parse(session!);

  const [query, setQuery] = React.useState<any>(false);
  const [address, setAddress] = React.useState<UserAddress | null>(null);
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

  React.useEffect(() => {
    handleGetAddress();
  }, []);

  const handleGetAddress = React.useCallback(async () => {
    const data = await getAddress(Number(params.id), user.access);

    if (data) {
      setAddress(data);
    } else {
      setAddress(null);
    }
  }, []);

  const onSubmit = (values: any) => {
    try {
    } catch (error) {}
  };

  if (!address) {
    return null;
  }

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
      >
        {({ handleSubmit }) => (
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
                  />
                </View>
                <View className="mb-4">
                  <AutocompleteInput name="address" setQuery={setQuery} />
                </View>
                <View className="mb-4">
                  <TextInput
                    className="w-full h-14 px-4 text-base leading-5 border-[0.7px] border-[#d0d0d0] rounded-lg"
                    id="phone"
                    placeholder="Telefon nömrəsi"
                  />
                </View>
                <View className="mb-4">
                  <TextInput
                    className="w-full h-14 px-4 text-base leading-5 border-[0.7px] border-[#d0d0d0] rounded-lg"
                    id="city"
                    placeholder="Şəhər"
                  />
                </View>
                <View className="mb-4">
                  <TextInput
                    className="w-full h-14 px-4 text-base leading-5 border-[0.7px] border-[#d0d0d0] rounded-lg"
                    id="postCode"
                    placeholder="Poçt kodu"
                  />
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
