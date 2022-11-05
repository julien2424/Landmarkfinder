import { Button, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Magnetometer } from "expo-sensors";

export function HomeScreen({ navigation, route }) {
  // console.log("test home");
  const [subscription, setSubscription] = useState(null);
  const [coord, setCoord] = useState([0, 0]);
  const [angle, setAngle] = useState(0);

  Magnetometer.setUpdateInterval(1000);

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setAngle(getAngle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  return (
    <View style={[styles.container]}>
      <View style={{ width: "100%", height: "85%", backgroundColor: "blue" }}>
        <Maps coord={coord} setCoord={setCoord}></Maps>
      </View>
      <View style={{ width: "100%", height: "15%", backgroundColor: "gray" }}>
        <BottomTab
          coord={coord}
          angle={angle}
          navigation={navigation}
        ></BottomTab>
      </View>
    </View>
  );
}

const Maps = (props) => {
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      showsMyLocationButton={true}
      mapType={"terrain"}
      rotateEnabled={false}
      initialRegion={{
        latitude: props.coord[0],
        longitude: props.coord[1],
        latitudeDelta: 0,
        longitudeDelta: 0,
      }}
      onUserLocationChange={(e) => {
        props.setCoord([
          e.nativeEvent.coordinate.latitude,
          e.nativeEvent.coordinate.longitude,
        ]);
      }}
    />
  );
};

const BottomTab = (props) => {
  return (
    <View style={styles.bottomTab}>
      <FilterButton navigation={props.navigation}></FilterButton>
      <SearchButton
        coord={props.coord}
        angle={props.angle}
        navigation={props.navigation}
      ></SearchButton>
      <InfoButton navigation={props.navigation}></InfoButton>
    </View>
  );
};

const FilterButton = (props) => {
  return (
    <View
      style={[
        styles.button,
        {
          width: "30%",
        },
      ]}
    >
      <Button
        onPress={() => props.navigation.navigate("Filter")}
        title="filter"
        color="black"
      />
    </View>
  );
};

const SearchButton = (props) => {
  return (
    <View
      style={[
        styles.button,
        {
          width: "40%",
        },
      ]}
    >
      <Button
        onPress={() => search(props.coord, props.angle, props.navigation)}
        title="search"
        color="black"
      />
    </View>
  );
};

function search(coord, angle, navigation) {
  navigation.navigate("Result", {
    coord: coord,
    angle: angle,
  });
}

const InfoButton = (props) => {
  return (
    <View
      style={[
        styles.button,
        {
          width: "30%",
        },
      ]}
    >
      <Button
        onPress={() => props.navigation.navigate("Info")}
        title="info"
        color="black"
      />
    </View>
  );
};

const getAngle = (data) => {
  let angle = 0;
  if (data) {
    let { x, y, z } = data;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
  }
  return Math.round(angle);
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
  bottomTab: {
    height: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  button: {
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
  },
});
