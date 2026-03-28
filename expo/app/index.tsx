import { useRouter } from "expo-router";
import { Play } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";



const MOTIVATIONAL_QUOTES = [
  "Every hero begins with one step.",
  "Your journey starts now.",
  "Believe in yourself and jump higher.",
  "Progress is power — keep going.",
  "Every level is a new opportunity.",
  "You're stronger than you think.",
  "Adventure awaits the brave.",
  "Small steps lead to great victories.",
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [quote, setQuote] = useState("");
  const titleAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const randomQuote =
      MOTIVATIONAL_QUOTES[
        Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)
      ];
    setQuote(randomQuote);

    Animated.sequence([
      Animated.spring(titleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(buttonAnim, {
        toValue: 1,
        tension: 30,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [titleAnim, buttonAnim]);

  const handleStartGame = () => {
    router.push("./game" as any);
  };

  return (
    <LinearGradient
      colors={["#4A90E2", "#87CEEB", "#B8E6F5"]}
      style={styles.container}
    >
      <View style={[styles.content, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: titleAnim,
              transform: [
                {
                  translateY: titleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.title}>HERO&apos;S</Text>
          <Text style={styles.title}>JOURNEY</Text>
          <View style={styles.titleUnderline} />
        </Animated.View>

        <Animated.View
          style={[
            styles.quoteContainer,
            {
              opacity: titleAnim,
            },
          ]}
        >
          <Text style={styles.quote}>&quot;{quote}&quot;</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonAnim,
              transform: [
                {
                  scale: buttonAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.playButton}
            onPress={handleStartGame}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#FFD700", "#FFA500"]}
              style={styles.playButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.playButtonText}>START ADVENTURE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.decorativeElements}>
          <View style={[styles.cloud, { top: 100, left: 50 }]} />
          <View style={[styles.cloud, { top: 200, right: 30 }]} />
          <View style={[styles.cloud, { bottom: 150, left: 20 }]} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 56,
    fontWeight: "900" as const,
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
    letterSpacing: 4,
  },
  titleUnderline: {
    width: 200,
    height: 6,
    backgroundColor: "#FFD700",
    marginTop: 10,
    borderRadius: 3,
  },
  quoteContainer: {
    marginBottom: 60,
    paddingHorizontal: 30,
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic" as const,
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  playButton: {
    borderRadius: 50,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  playButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 40,
    gap: 12,
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  decorativeElements: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  cloud: {
    position: "absolute",
    width: 80,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 40,
  },
});
