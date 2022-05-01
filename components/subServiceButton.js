import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SubServiceButton = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.subservicebuttoncontainer}>
      <TouchableOpacity
        style={styles.subservicebutton}
        onPress={() => {
          navigation.navigate("Detail", { id: item[1] });
        }}
      >
        <Text style={styles.subservicebuttontext}>{item[0]}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subservicebuttoncontainer: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    // flexBasis: "50%",
  },
  subservicebutton: {
    height: 72,
    borderRadius: 10,
    backgroundColor: "#B2C1DE",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  subservicebuttontext: {
    fontSize: 20,
  },
});

export default SubServiceButton;
