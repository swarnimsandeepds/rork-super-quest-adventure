import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { Coin as CoinType } from "@/types/game";
import { COLORS } from "@/constants/gameConfig";

interface CoinProps {
  coin: CoinType;
}

export default function Coin({ coin }: CoinProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!coin.collected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [coin.collected, rotateAnim, scaleAnim]);

  if (coin.collected) {
    return null;
  }

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.coin,
        {
          left: coin.x,
          top: coin.y,
          width: coin.width,
          height: coin.height,
          transform: [{ rotate }, { scale: scaleAnim }],
        },
      ]}
    >
      <Animated.View style={styles.coinInner} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  coin: {
    position: "absolute",
    borderRadius: 100,
    backgroundColor: COLORS.COIN,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFA500",
  },
  coinInner: {
    width: "60%",
    height: "60%",
    borderRadius: 100,
    backgroundColor: "#FFA500",
  },
});
