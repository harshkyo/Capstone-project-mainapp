import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, FlatList, Animated } from "react-native";
import Card from "./card";
import { useRef } from "react";

const { width } = Dimensions.get("window");
const scrollX = new Animated.Value(0);
let position = Animated.divide(scrollX, width);

const Carousel = ({ data }) => {
  const list = useRef(null);
  const [dataList, setDataList] = useState(data);
  useEffect(() => setDataList(data));
  useEffect(() => {
    infiniteScroll(dataList);
  }, [dataList]);
  function infiniteScroll(dataList) {
    let numberOfData = dataList.length;
    let scrollValue = 0,
      index = 0;
    let i = 0;
    setInterval(() => {
      if (index < numberOfData) scrollValue = scrollValue + width;
      else {
        scrollValue = 0;
        index = 0;
      }
      index++;
      if (numberOfData != 0) {
        list.current.scrollToOffset({ animated: true, offset: scrollValue });
      }
    }, 5000);
  }
  if (data && data.length) {
    return (
      <View>
        <Animated.FlatList
          data={data}
          ref={list}
          keyExtractor={(item, index) => "key" + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <Card item={item} />;
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />

        <View style={styles.dotView}>
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: "#595959",
                  margin: 5,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  dotView: { flexDirection: "row", justifyContent: "center" },
});

export default Carousel;
