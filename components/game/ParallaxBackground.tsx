import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/gameConfig";

interface ParallaxBackgroundProps {
  cameraOffset: number;
}

export default function ParallaxBackground({
  cameraOffset,
}: ParallaxBackgroundProps) {
  const layer1Offset = cameraOffset * 0.2;
  const layer2Offset = cameraOffset * 0.4;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.SKY[0], COLORS.SKY[1]]}
        style={styles.sky}
      />

      <View
        style={[
          styles.layer,
          {
            transform: [{ translateX: -layer1Offset }],
          },
        ]}
      >
        <View style={[styles.cloud, { top: 80, left: 200 }]} />
        <View style={[styles.cloud, { top: 150, left: 500 }]} />
        <View style={[styles.cloud, { top: 100, left: 900 }]} />
        <View style={[styles.cloud, { top: 180, left: 1300 }]} />
        <View style={[styles.cloud, { top: 120, left: 1700 }]} />
        <View style={[styles.cloud, { top: 160, left: 2100 }]} />
        <View style={[styles.cloud, { top: 90, left: 2500 }]} />
      </View>

      <View
        style={[
          styles.layer,
          {
            transform: [{ translateX: -layer2Offset }],
          },
        ]}
      >
        <View style={[styles.mountain, { left: 100 }]} />
        <View style={[styles.mountain, { left: 400 }]} />
        <View style={[styles.mountain, { left: 800 }]} />
        <View style={[styles.mountain, { left: 1200 }]} />
        <View style={[styles.mountain, { left: 1600 }]} />
        <View style={[styles.mountain, { left: 2000 }]} />
        <View style={[styles.mountain, { left: 2400 }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  sky: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  layer: {
    position: "absolute",
    width: 3000,
    height: "100%",
  },
  cloud: {
    position: "absolute",
    width: 100,
    height: 50,
    backgroundColor: COLORS.BACKGROUND_LAYER_1,
    borderRadius: 50,
  },
  mountain: {
    position: "absolute",
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 100,
    borderRightWidth: 100,
    borderBottomWidth: 200,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: COLORS.BACKGROUND_LAYER_2,
  },
});
