import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ServiceButton = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.servicebuttoncontainer}>
      <TouchableOpacity
        style={styles.servicebutton}
        onPress={() => {
          navigation.navigate("SubService", { service: item });
        }}
      >
        <Text style={styles.servicebuttontext}>{item[0]}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  servicebuttoncontainer: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: "50%",
  },
  servicebutton: {
    height: 72,
    borderRadius: 10,
    backgroundColor: "#B2C1DE",
    alignItems: "center",
    justifyContent: "center",
    width: 140,
  },
  servicebuttontext: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default ServiceButton;
