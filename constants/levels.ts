import { Platform, Coin, Enemy } from "@/types/game";

export interface LevelData {
  id: number;
  name: string;
  platforms: Omit<Platform, "id">[];
  coins: Omit<Coin, "id" | "collected">[];
  enemies: Omit<Enemy, "id">[];
  backgroundColor: string[];
  finishLine: number;
}

export const LEVEL_1: LevelData = {
  id: 1,
  name: "Forest Beginning",
  backgroundColor: ["#4A90E2", "#87CEEB"],
  finishLine: 3000,
  platforms: [
    { x: 0, y: 500, width: 800, height: 50, type: "ground" },
    { x: 800, y: 500, width: 400, height: 50, type: "ground" },
    { x: 1200, y: 500, width: 600, height: 50, type: "ground" },
    { x: 1800, y: 500, width: 400, height: 50, type: "ground" },
    { x: 2200, y: 500, width: 800, height: 50, type: "ground" },
    
    { x: 400, y: 380, width: 120, height: 20, type: "floating" },
    { x: 600, y: 320, width: 120, height: 20, type: "floating" },
    { x: 900, y: 380, width: 120, height: 20, type: "floating" },
    { x: 1100, y: 320, width: 120, height: 20, type: "floating" },
    { x: 1400, y: 360, width: 120, height: 20, type: "floating" },
    { x: 1600, y: 300, width: 120, height: 20, type: "floating" },
    { x: 1900, y: 380, width: 120, height: 20, type: "floating" },
    { x: 2100, y: 340, width: 120, height: 20, type: "floating" },
    { x: 2400, y: 380, width: 120, height: 20, type: "floating" },
    { x: 2700, y: 320, width: 120, height: 20, type: "floating" },
  ],
  coins: [
    { x: 200, y: 450, width: 20, height: 20, value: 10 },
    { x: 250, y: 450, width: 20, height: 20, value: 10 },
    { x: 300, y: 450, width: 20, height: 20, value: 10 },
    { x: 450, y: 330, width: 20, height: 20, value: 10 },
    { x: 650, y: 270, width: 20, height: 20, value: 10 },
    { x: 950, y: 330, width: 20, height: 20, value: 10 },
    { x: 1150, y: 270, width: 20, height: 20, value: 10 },
    { x: 1450, y: 310, width: 20, height: 20, value: 10 },
    { x: 1650, y: 250, width: 20, height: 20, value: 10 },
    { x: 1950, y: 330, width: 20, height: 20, value: 10 },
    { x: 2150, y: 290, width: 20, height: 20, value: 10 },
    { x: 2450, y: 330, width: 20, height: 20, value: 10 },
    { x: 2750, y: 270, width: 20, height: 20, value: 10 },
    { x: 2900, y: 450, width: 20, height: 20, value: 10 },
    { x: 2950, y: 450, width: 20, height: 20, value: 10 },
  ],
  enemies: [],
};

export const LEVELS: LevelData[] = [LEVEL_1];
