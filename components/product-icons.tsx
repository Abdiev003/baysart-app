import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { currencyFormat } from "../lib/utils";

const ProductIcons = ({ product }: { product: any }) => {
  return (
    <View style={styles.iconList}>
      <View style={styles.productIconContainer}>
        <View style={styles.productIconImage}>
          <Image
            style={styles.image}
            source={require("../assets/images/general/download.png")}
          />
        </View>
        <View style={styles.productIconText}>
          <Text>Təxmini çatdırılma: bir həftə</Text>
        </View>
      </View>

      <View style={styles.productIconContainer}>
        <View style={styles.productIconImage}>
          <Image
            style={styles.image}
            source={require("../assets/images/general/download-1.png")}
          />
        </View>
        <View style={styles.productIconText}>
          <Text>
            12 aylıq taksit ilə ayda cəmi: {""}
            <Text style={{ color: "red", fontSize: 14 }}>
              {currencyFormat(product?.price / 12)}
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.productIconContainer}>
        <View style={styles.productIconImage}>
          <Image
            style={styles.image}
            source={require("../assets/images/general/download-2.png")}
          />
        </View>
        <View style={styles.productIconText}>
          <Text>
            <Text style={{ color: "#756EB1" }}>Təhlükəsiz və güvənli</Text>{" "}
            satış prosesi
          </Text>
        </View>
      </View>

      <View style={styles.productIconContainer}>
        <View style={styles.productIconImage}>
          <Image
            style={styles.image}
            source={require("../assets/images/general/download-3.png")}
          />
        </View>
        <View style={styles.productIconText}>
          <Text>
            <Text style={{ color: "#756EB1" }}>Nəğd,</Text>{" "}
            <Text style={{ color: "#756EB1" }}>taksit</Text> və {""}
            <Text style={{ color: "#756EB1" }}>kartla</Text> ödəniş
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconList: {
    flexDirection: "column",
  },
  productIconImage: {
    flexDirection: "row",
    marginBottom: 5,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  productIconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  productIconContainer: {
    flexDirection: "row",
  },
});

export default ProductIcons;
