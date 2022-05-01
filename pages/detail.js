import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import SearchbarComponent from "../components/searchbar";

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    viewDetail();
  },[subservice]);
  const [subservice, setsubservice] = useState([]);
  const [information, setinformation] = useState([]);
  const { width } = useWindowDimensions();
  const viewDetail = async () => {
    try {
      await axios
        .get(`https://public-service-api.herokuapp.com/information`, {
          params: { id: route.params.id },
        })
        .then((res) => {
          if (res.data.success === true) {
            let result = res.data.listall.map((a) => a.subservice);
            let resultinfo = res.data.listall.map((a) => a.information);
            setsubservice(result);
            setinformation(resultinfo);
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
          <Text style={styles.headingtext}>{subservice[0]}</Text>
        </View>
        <View style={styles.scrollviewcontainer}>
          <ScrollView style={styles.scrollview}>
            {/* <Text>{information[0]}</Text> */}
            {information[0] && (
              <RenderHtml
                contentWidth={width}
                source={{ html: information[0] }}
              />
            )}
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
  },
  heading: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  headingtext: {
    fontSize: 28,
    fontWeight: "bold",
  },
  scrollviewcontainer: {
    height: Dimensions.get("screen").height - (280 + StatusBar.currentHeight),
    width: Dimensions.get("screen").width - 60,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 30,
    elevation: 5,
    shadowColor: "black",
    zIndex: 3,
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

export default Detail;
