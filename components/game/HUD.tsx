import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Heart, Coins } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HUDProps {
  score: number;
  coinsCollected: number;
  health: number;
  maxHealth: number;
}

export default function HUD({
  score,
  coinsCollected,
  health,
  maxHealth,
}: HUDProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { top: insets.top + 10 }]}>
      <View style={styles.leftSection}>
        <View style={styles.statContainer}>
          <Coins size={20} color="#FFD700" fill="#FFD700" />
          <Text style={styles.statText}>{coinsCollected}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.scoreLabel}>Score:</Text>
          <Text style={styles.statText}>{score}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.healthContainer}>
          {Array.from({ length: maxHealth }).map((_, index) => (
            <Heart
              key={index}
              size={24}
              color={index < health ? "#FF6B6B" : "#CCCCCC"}
              fill={index < health ? "#FF6B6B" : "transparent"}
              style={styles.heart}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    zIndex: 100,
  },
  leftSection: {
    flexDirection: "column",
    gap: 8,
  },
  rightSection: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  statContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700" as const,
  },
  scoreLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600" as const,
  },
  healthContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  heart: {
    marginHorizontal: 2,
  },
});
