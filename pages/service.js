import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import SearchbarComponent from "../components/searchbar";
import ServiceButton from "../components/serviceButton";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Service = () => {
  const navigation = useNavigation();
  useEffect(() => {
    viewService();
  }, []);
  const [isservice, setservice] = useState([]);
  const viewService = async () => {
    try {
      await axios.get(`https://public-service-api.herokuapp.com/services`,).then((res) => {
        if (res.data.success === true) {
          let result = res.data.listall.map((a) => a.service);
          setservice(result);
        }
      });
    } catch (error) {
      throw error;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <SearchbarComponent />
        <View style={styles.heading}>
          <Text style={styles.headingtext}>Services:</Text>
        </View>
        <View style={styles.scrollviewcontainer}>
          <ScrollView>
            <View style={styles.scrollview}>
              {isservice.map((item, index) => {
                return <ServiceButton key={item} item={[item]} />;
              })}
            </View>
          </ScrollView>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backbuttontext}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height - (70 + StatusBar.currentHeight),
    top: 70 + StatusBar.currentHeight,
    width: "100%",
  },
  heading: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  headingtext: {
    fontSize: 28,
    fontWeight: "bold",
    // padding: 15,
  },
  scrollviewcontainer: {
    height: Dimensions.get("screen").height - (280 + StatusBar.currentHeight),
    // width: Dimensions.get("screen").width - 60,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 30,
    elevation: 5,
    shadowColor: "black",
    zIndex: 3,
  },
  scrollview: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 50,
  },
  text: {
    fontSize: 22,
    paddingBottom: 50,
  },
  button: {
    position: "absolute",
    width: 80,
    height: 50,
    right: 9,
    bottom: 9,
    borderRadius: 100,
    backgroundColor: "#009fff",
    padding: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "black",
  },
  backbuttontext: {
    color: "white",
    fontSize: 20,
  },
});

export default Service;
