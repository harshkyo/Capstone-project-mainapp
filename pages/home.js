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

import Carousel from "../components/carousel";
import SearchbarComponent from "../components/searchbar";
import ServiceButton from "../components/serviceButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  useEffect(() => {
    viewCarousel();
    viewService();
  }, []);
  const [isservice, setservice] = useState([]);
  const [carouseldata, setcarouseldata] = useState([]);
  const navigation = useNavigation();
  const viewService = async () => {
    try {
      await axios
        .get(`https://public-service-api.herokuapp.com/fourRandomServices`)
        .then((res) => {
          if (res.data.success === true) {
            let result = res.data.listall.map((a) => a.service);
            setservice(result);
          }
        });
    } catch (error) {
      throw error;
    }
  };
  const viewCarousel = async () => {
    try {
      await axios
        .get(`https://public-service-api.herokuapp.com/fiveRandomSubServices`)
        .then((res) => {
          if (res.data.success === true) {
            setcarouseldata(res.data.listId);
          }
        });
    } catch (error) {
      throw error;
    }
  };
  
  return (
    <View>
      <SafeAreaView style={styles.container}>
            <SearchbarComponent />
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.visiblescreen}>
            <Carousel data={carouseldata} />
            <View style={styles.randomservicescontainer}>
              <Text style={styles.servicesheading}>Services</Text>
              <View style={styles.randomservices}>
                {isservice.map((item, index) => {
                  return <ServiceButton key={item} item={[item]} />;
                })}
              </View>
            </View>
            <View style={styles.morebuttoncontainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Service")}
                // style={styles.visiblebutton}
              >
                <Text style={styles.backbuttontext}>More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height - 70,
    top: 70 + StatusBar.currentHeight,
  },
  visiblescreen: {
    paddingBottom: 10,
  },
  randomservicescontainer: {
    flex: 1,
    width: Dimensions.get("window").width - 40,
    padding: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "white",
    elevation: 5,
    height: 300,
    borderRadius: 20,
  },
  servicesheading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  randomservices: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  morebuttoncontainer: {
    // flex: 1,
    position: "absolute",
    width: "100%",
    bottom: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: "74%",
    height: 50,
    alignItems: "center",
    backgroundColor: "#009fff",
    elevation: 8,
    shadowColor: "black",
  },
  backbuttontext: {
    color: "white",
    fontSize: 20,
  },
});

export default Home;
