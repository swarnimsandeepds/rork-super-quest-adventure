import React from "react";
import { View, StyleSheet } from "react-native";
import { Platform as PlatformType } from "@/types/game";
import { COLORS } from "@/constants/gameConfig";

interface PlatformProps {
  platform: PlatformType;
}

export default function Platform({ platform }: PlatformProps) {
  const backgroundColor =
    platform.type === "ground"
      ? COLORS.PLATFORM_GROUND
      : COLORS.PLATFORM_FLOATING;

  return (
    <View
      style={[
        styles.platform,
        {
          left: platform.x,
          top: platform.y,
          width: platform.width,
          height: platform.height,
          backgroundColor,
        },
      ]}
    >
      {platform.type === "ground" && (
        <>
          <View style={styles.grassLine} />
          <View style={[styles.grassBlade, { left: "10%" }]} />
          <View style={[styles.grassBlade, { left: "30%" }]} />
          <View style={[styles.grassBlade, { left: "50%" }]} />
          <View style={[styles.grassBlade, { left: "70%" }]} />
          <View style={[styles.grassBlade, { left: "90%" }]} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  platform: {
    position: "absolute",
    borderRadius: 4,
  },
  grassLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#27AE60",
  },
  grassBlade: {
    position: "absolute",
    top: -4,
    width: 3,
    height: 6,
    backgroundColor: "#27AE60",
    borderRadius: 2,
  },
});
