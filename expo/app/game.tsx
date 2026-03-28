import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Trophy, RotateCcw } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

import { GameState, Player as PlayerType, Platform as PlatformType, Coin as CoinType } from "@/types/game";
import { GAME_CONFIG } from "@/constants/gameConfig";
import { LEVEL_1 } from "@/constants/levels";
import {
  applyGravity,
  applyFriction,
  updatePlayerPosition,
  handlePlatformCollisions,
  checkCoinCollision,
  JUMP_FORCE,
  MOVE_SPEED,
} from "@/utils/physics";

import Player from "@/components/game/Player";
import PlatformComponent from "@/components/game/Platform";
import Coin from "@/components/game/Coin";
import HUD from "@/components/game/HUD";
import Controls from "@/components/game/Controls";
import ParallaxBackground from "@/components/game/ParallaxBackground";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const VICTORY_QUOTES = [
  "Amazing! You're a true hero!",
  "Progress is power — keep going!",
  "You did it! Every victory counts!",
  "Incredible! You're unstoppable!",
  "Well done, champion!",
];

export default function GameScreen() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>(() => initializeGame());
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function initializeGame(): GameState {
    const platforms: PlatformType[] = LEVEL_1.platforms.map((p, index) => ({
      ...p,
      id: `platform-${index}`,
    }));

    const coins: CoinType[] = LEVEL_1.coins.map((c, index) => ({
      ...c,
      id: `coin-${index}`,
      collected: false,
    }));

    const player: PlayerType = {
      id: "player",
      x: GAME_CONFIG.PLAYER_START_X,
      y: GAME_CONFIG.PLAYER_START_Y,
      width: GAME_CONFIG.PLAYER_WIDTH,
      height: GAME_CONFIG.PLAYER_HEIGHT,
      velocity: { x: 0, y: 0 },
      isJumping: false,
      isOnGround: false,
      health: GAME_CONFIG.PLAYER_MAX_HEALTH,
      direction: "right",
    };

    return {
      player,
      platforms,
      coins,
      enemies: [],
      score: 0,
      coinsCollected: 0,
      level: 1,
      gameStatus: "playing",
      cameraOffset: 0,
    };
  }

  const updateGame = useCallback(() => {
    setGameState((prevState) => {
      if (prevState.gameStatus !== "playing") {
        return prevState;
      }

      let updatedPlayer = { ...prevState.player };

      if (isMovingLeft) {
        updatedPlayer.velocity.x = -MOVE_SPEED;
        updatedPlayer.direction = "left";
      } else if (isMovingRight) {
        updatedPlayer.velocity.x = MOVE_SPEED;
        updatedPlayer.direction = "right";
      }

      updatedPlayer = applyGravity(updatedPlayer);
      updatedPlayer = applyFriction(updatedPlayer);
      updatedPlayer = updatePlayerPosition(updatedPlayer);
      updatedPlayer = handlePlatformCollisions(updatedPlayer, prevState.platforms);

      if (updatedPlayer.y > SCREEN_HEIGHT) {
        updatedPlayer.y = GAME_CONFIG.PLAYER_START_Y;
        updatedPlayer.x = GAME_CONFIG.PLAYER_START_X;
        updatedPlayer.velocity = { x: 0, y: 0 };
        updatedPlayer.health = Math.max(0, updatedPlayer.health - 1);
      }

      let updatedCoins = [...prevState.coins];
      let scoreIncrease = 0;
      let coinsCollectedCount = 0;

      updatedCoins = updatedCoins.map((coin) => {
        if (!coin.collected && checkCoinCollision(updatedPlayer, coin)) {
          if (Platform.OS !== "web") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
          scoreIncrease += coin.value;
          coinsCollectedCount += 1;
          return { ...coin, collected: true };
        }
        return coin;
      });

      const cameraOffset = Math.max(
        0,
        updatedPlayer.x - GAME_CONFIG.CAMERA_FOLLOW_OFFSET
      );

      let newGameStatus: GameState["gameStatus"] = prevState.gameStatus;
      if (updatedPlayer.health <= 0) {
        newGameStatus = "gameOver";
      } else if (updatedPlayer.x >= LEVEL_1.finishLine) {
        newGameStatus = "victory";
        if (Platform.OS !== "web") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      }

      return {
        ...prevState,
        player: updatedPlayer,
        coins: updatedCoins,
        score: prevState.score + scoreIncrease,
        coinsCollected: prevState.coinsCollected + coinsCollectedCount,
        cameraOffset,
        gameStatus: newGameStatus,
      };
    });
  }, [isMovingLeft, isMovingRight]);

  useEffect(() => {
    if (gameState.gameStatus === "playing") {
      gameLoopRef.current = setInterval(() => {
        updateGame();
      }, GAME_CONFIG.FRAME_TIME);

      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [gameState.gameStatus, updateGame]);

  const handleJump = useCallback(() => {
    setGameState((prevState) => {
      if (
        prevState.gameStatus === "playing" &&
        prevState.player.isOnGround &&
        !prevState.player.isJumping
      ) {
        return {
          ...prevState,
          player: {
            ...prevState.player,
            velocity: {
              ...prevState.player.velocity,
              y: JUMP_FORCE,
            },
            isJumping: true,
          },
        };
      }
      return prevState;
    });
  }, []);

  const handleRestart = () => {
    setGameState(initializeGame());
    setIsMovingLeft(false);
    setIsMovingRight(false);
  };

  const handleBackToMenu = () => {
    router.back();
  };

  if (gameState.gameStatus === "victory") {
    const randomQuote =
      VICTORY_QUOTES[Math.floor(Math.random() * VICTORY_QUOTES.length)];

    return (
      <LinearGradient colors={["#2ECC71", "#27AE60"]} style={styles.container}>
        <View style={styles.endScreen}>
          <Trophy size={80} color="#FFD700" fill="#FFD700" />
          <Text style={styles.endTitle}>VICTORY!</Text>
          <Text style={styles.endQuote}>&quot;{randomQuote}&quot;</Text>
          <View style={styles.statsContainer}>
            <Text style={styles.statText}>Score: {gameState.score}</Text>
            <Text style={styles.statText}>
              Coins: {gameState.coinsCollected}
            </Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.endButton}
              onPress={handleRestart}
              activeOpacity={0.8}
            >
              <RotateCcw size={24} color="#FFFFFF" />
              <Text style={styles.endButtonText}>Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.endButton, styles.secondaryButton]}
              onPress={handleBackToMenu}
              activeOpacity={0.8}
            >
              <Text style={styles.endButtonText}>Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  if (gameState.gameStatus === "gameOver") {
    return (
      <LinearGradient colors={["#E74C3C", "#C0392B"]} style={styles.container}>
        <View style={styles.endScreen}>
          <Text style={styles.endTitle}>GAME OVER</Text>
          <Text style={styles.endQuote}>
            &quot;Every setback is a setup for a comeback!&quot;
          </Text>
          <View style={styles.statsContainer}>
            <Text style={styles.statText}>Score: {gameState.score}</Text>
            <Text style={styles.statText}>
              Coins: {gameState.coinsCollected}
            </Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.endButton}
              onPress={handleRestart}
              activeOpacity={0.8}
            >
              <RotateCcw size={24} color="#FFFFFF" />
              <Text style={styles.endButtonText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.endButton, styles.secondaryButton]}
              onPress={handleBackToMenu}
              activeOpacity={0.8}
            >
              <Text style={styles.endButtonText}>Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <ParallaxBackground cameraOffset={gameState.cameraOffset} />

      <View
        style={[
          styles.gameWorld,
          {
            transform: [{ translateX: -gameState.cameraOffset }],
          },
        ]}
      >
        {gameState.platforms.map((platform) => (
          <PlatformComponent key={platform.id} platform={platform} />
        ))}

        {gameState.coins.map((coin) => (
          <Coin key={coin.id} coin={coin} />
        ))}

        <Player player={gameState.player} />

        <View
          style={[
            styles.finishLine,
            {
              left: LEVEL_1.finishLine,
            },
          ]}
        >
          <Trophy size={40} color="#FFD700" fill="#FFD700" />
        </View>
      </View>

      <HUD
        score={gameState.score}
        coinsCollected={gameState.coinsCollected}
        health={gameState.player.health}
        maxHealth={GAME_CONFIG.PLAYER_MAX_HEALTH}
      />

      <Controls
        onMoveLeft={() => setIsMovingLeft(true)}
        onMoveRight={() => setIsMovingRight(true)}
        onJump={handleJump}
        onStopMoving={() => {
          setIsMovingLeft(false);
          setIsMovingRight(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB",
  },
  gameWorld: {
    position: "absolute",
    width: 3000,
    height: SCREEN_HEIGHT,
  },
  finishLine: {
    position: "absolute",
    top: SCREEN_HEIGHT / 2 - 100,
    width: 60,
    height: 200,
    backgroundColor: "rgba(255, 215, 0, 0.3)",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
  },
  endScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 20,
  },
  endTitle: {
    fontSize: 48,
    fontWeight: "900" as const,
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  endQuote: {
    fontSize: 18,
    fontStyle: "italic" as const,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 10,
  },
  statsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 20,
    gap: 10,
    marginTop: 20,
  },
  statText: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "column",
    gap: 12,
    marginTop: 20,
    width: "100%",
  },
  endButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  endButtonText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
});
