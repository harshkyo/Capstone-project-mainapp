import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Searchbar } from "react-native-paper";
import axios from "axios";
import SubServiceButton from "../components/subServiceButton";
const { height } = Dimensions.get("window");

const SearchbarComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [resultVisibility, setresultVisibility] = React.useState("none");
  const [resultHeight, setresultHeight] = React.useState(0);
  const [isservice, setservice] = React.useState([]);
  const [isid, setId] = React.useState([]);
  React.useEffect(() => {
    if (searchQuery === "") {
      setresultVisibility("none");
      setresultHeight(0);
    } else {
      setresultHeight(height);
      setresultVisibility("flex");
      viewResult(searchQuery);
    }
  }, [searchQuery]);
  const viewResult = async (searchQuery) => {
    try {
      await axios
        .get(`https://public-service-api.herokuapp.com/search`, {
          params: { subservice: searchQuery },
        })
        .then((res) => {
          if (res.data.success === true) {
            let result = res.data.listall.map((a) => a.subservice);
            let resultid = res.data.listall.map((a) => a.id);
            setservice(result);
            setId(resultid);
          }
        });
    } catch (error) {
      throw error;
    }
  };
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={styles.barContainer}>
      <Searchbar
        style={styles.bar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <TouchableWithoutFeedback>
        <View
          style={[
            styles.resultContainer,
            { display: resultVisibility, height: resultHeight },
          ]}
        >
          <FlatList
            style={[{ display: resultVisibility }, styles.result]}
            data={isservice}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item, index }) => {
              return <SubServiceButton item={[item, isid[index]]} />;
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    width: "100%",
    top: 13,
    alignItems: "center",
  },
  bar: {
    zIndex: 10,
    backgroundColor: "#EBEBEB",
    width: "95%",
    height: 45,
    justifyContent: "center",
    alignItems: "flex-start",
    elevation: 5,
    shadowColor: "#52006A",
    borderRadius: 10,
  },
  resultContainer: {
    position: "absolute",
    top: -13,
    zIndex: 5,
    width: "100%",
    backgroundColor: "rgba(67, 68, 69, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  result: {
    marginTop: 70,
    width: "95%",
  },
});

export default SearchbarComponent;
