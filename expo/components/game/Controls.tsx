import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

interface ControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onJump: () => void;
  onStopMoving: () => void;
}

export default function Controls({
  onMoveLeft,
  onMoveRight,
  onJump,
  onStopMoving,
}: ControlsProps) {
  const insets = useSafeAreaInsets();

  const handlePress = (action: () => void) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    action();
  };

  return (
    <View style={[styles.container, { bottom: insets.bottom + 20 }]}>
      <View style={styles.leftControls}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => handlePress(onMoveLeft)}
          onPressOut={onStopMoving}
          activeOpacity={0.7}
        >
          <ArrowLeft size={32} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => handlePress(onMoveRight)}
          onPressOut={onStopMoving}
          activeOpacity={0.7}
        >
          <ArrowRight size={32} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <View style={styles.rightControls}>
        <TouchableOpacity
          style={[styles.button, styles.jumpButton]}
          onPress={() => handlePress(onJump)}
          activeOpacity={0.7}
        >
          <ArrowUp size={36} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>
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
    alignItems: "flex-end",
    paddingHorizontal: 20,
    zIndex: 100,
  },
  leftControls: {
    flexDirection: "row",
    gap: 12,
  },
  rightControls: {
    flexDirection: "row",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  jumpButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 107, 107, 0.8)",
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
});
