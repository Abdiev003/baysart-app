import { useField } from "formik";
import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";

interface IGooglePrediction {
  id: string;
  description: string;
}

interface IAutocompleteInputProps {
  name: string;
  setQuery: React.Dispatch<React.SetStateAction<any>>;
}

const AutocompleteInput: React.FC<IAutocompleteInputProps> = ({
  name,
  setQuery,
}) => {
  const [field] = useField(name);
  const [data, setData] = useState<IGooglePrediction[]>([]);

  const fetchPlaces = (newQuery: string) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${newQuery}&types=address&components=country:az&key=AIzaSyA1LM_4IFQWYxlhUCs6KHS4aag2Xax1X5o`
    )
      .then((response) => response.json())
      .then((result) => setData(result.predictions))
      .catch((err) => console.error(err));
  };

  const renderItem = ({ item }: { item: IGooglePrediction }) => (
    <TouchableOpacity
      className="px-4 py-2"
      onPress={() => {
        setQuery(item);
        field.onChange(name)(item.description);
        setData([]);
      }}
    >
      <Text className="text-base">{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="w-full border-[0.7px] border-[#d0d0d0] rounded-lg">
      <TextInput
        id="autocomplete-input"
        style={{ fontFamily: "Nunito-Bold" }}
        placeholder="Ünvan"
        className="w-full h-14 px-4 text-base leading-5"
        onChangeText={(newQuery: string) => {
          field.onChange(name)(newQuery);
          fetchPlaces(newQuery);
        }}
        {...field}
      />
      <FlatList
        data={data}
        keyExtractor={(item: IGooglePrediction) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AutocompleteInput;
