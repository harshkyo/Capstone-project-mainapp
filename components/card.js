import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const { width} = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";

const Card = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardView}>
        <TouchableOpacity
          style={styles.touchablecard}
          onPress={() => navigation.navigate("Detail", {"id": item.id})}
        >
          <View>
            <Text style={styles.heading}>{item.subservice}</Text>
          </View>
          <Text>Click to see details...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    top: 20,
    marginBottom: 35,
    width: width,
  },
  cardView: {
    flex: 1,
    width: width - 20,
    // height: 193,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    elevation: 15,
    shadowColor: "#52006A",
  },
  touchablecard: {
    width: width - 20,
    height: 193,
    paddingHorizontal: 25,
    justifyContent: "center",
    borderRadius: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
});

export default Card;
