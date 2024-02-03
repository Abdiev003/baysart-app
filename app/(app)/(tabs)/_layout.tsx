import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Platform, Pressable, TouchableOpacity } from "react-native";

import Colors from "../../../constants/Colors";
import { View } from "../../../components/Themed";
import SearchInput from "../../../components/search-input";
import { NunitoBoldText } from "../../../components/StyledText";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          justifyContent: "center",
          backgroundColor: "#fff",
        },
        tabBarItemStyle: {
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          header: (props) => {
            return (
              <View
                style={{
                  height: Platform.OS === "ios" ? 40 : 140,
                }}
                className="w-full flex-row px-[23px] items-center justify-between bg-white"
              >
                <TouchableOpacity className="w-8 h-8 bg-[#574FA0] rounded-full items-center justify-center">
                  <FontAwesome size={15} name="bars" color="white" />
                </TouchableOpacity>
                <SearchInput />
                <View className="items-center justify-center">
                  <FontAwesome size={20} name="bell" color="#574FA0" />
                </View>
              </View>
            );
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerStyle: {
            height: 60,
            backgroundColor: "#fff",
          },
          headerTitle: () => (
            <NunitoBoldText
              style={{
                fontSize: 19,
              }}
              className="mt-0 w-full h-[60px]"
            >
              Favoritlər siyahısı
            </NunitoBoldText>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerStyle: {
            height: 60,
            backgroundColor: "#fff",
          },
          headerTitle: () => (
            <NunitoBoldText
              style={{
                fontSize: 19,
              }}
              className="mt-0 w-full h-[60px]"
            >
              Səbət
            </NunitoBoldText>
          ),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
