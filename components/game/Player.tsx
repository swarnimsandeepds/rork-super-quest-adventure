import React from "react";
import { View, StyleSheet } from "react-native";
import { Player as PlayerType } from "@/types/game";
import { COLORS } from "@/constants/gameConfig";

interface PlayerProps {
  player: PlayerType;
}

export default function Player({ player }: PlayerProps) {
  return (
    <View
      style={[
        styles.player,
        {
          left: player.x,
          top: player.y,
          width: player.width,
          height: player.height,
          transform: [{ scaleX: player.direction === "left" ? -1 : 1 }],
        },
      ]}
    >
      <View style={styles.body} />
      <View style={styles.head} />
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    position: "absolute",
  },
  body: {
    position: "absolute",
    bottom: 0,
    left: 8,
    width: 24,
    height: 30,
    backgroundColor: COLORS.PLAYER,
    borderRadius: 4,
  },
  head: {
    position: "absolute",
    top: 0,
    left: 10,
    width: 20,
    height: 20,
    backgroundColor: "#FFB6B6",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.PLAYER,
  },
});
