import { StyleSheet, View } from "react-native";
import React from "react";

export function FilterScreen() {
  console.log("test filter");
  return (
    <View style={[styles.container]}>
      <View style={{ width: "100%", height: "100%", backgroundColor: "gray" }}>
        <Bottom></Bottom>
      </View>
    </View>
  );
}

const Bottom = (props) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "gray",
          flexDirection: "col",
        },
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
