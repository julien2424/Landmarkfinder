import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";

export function ResultScreen({ navigation, route }) {
  // console.log("test result");
  console.log(route.params.angle);
  let distances = findPlaces(route.params.coord);
  console.log(distances);
  return (
    <View style={[styles.container]}>
      <View style={{ width: "100%", height: "100%", backgroundColor: "gray" }}>
        <Bottom></Bottom>
      </View>
    </View>
  );
}

function findPlaces(coord) {
  var config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coord[0]}%2C${coord[1]}&radius=15000&type=food&keyword=pizza&key=AIzaSyBlkCb3XvMW4IUt1RA5igSTyftwdZw16Pw`,
    headers: {},
  };

  let distances = {};

  axios(config)
    .then(function (response) {
      response.data["results"].forEach((element) => {
        let distance = findDistance(
          coord[0],
          element["geometry"]["location"].lat,
          coord[1],
          element["geometry"]["location"].lng
        );
        if (distance < 5) {
          distances[element["name"]] = distance;
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  return distances;
}

function findDistance(lat1, lat2, lon1, lon2) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 6371;
  return c * r;
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
