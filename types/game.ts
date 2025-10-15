export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface GameObject extends Position, Size {
  id: string;
}

export interface Player extends GameObject {
  velocity: Velocity;
  isJumping: boolean;
  isOnGround: boolean;
  health: number;
  direction: "left" | "right";
}

export interface Platform extends GameObject {
  type: "ground" | "floating";
}

export interface Coin extends GameObject {
  collected: boolean;
  value: number;
}

export interface Enemy extends GameObject {
  velocity: Velocity;
  health: number;
  type: "walker" | "flyer";
}

export interface GameState {
  player: Player;
  platforms: Platform[];
  coins: Coin[];
  enemies: Enemy[];
  score: number;
  coinsCollected: number;
  level: number;
  gameStatus: "playing" | "paused" | "victory" | "gameOver";
  cameraOffset: number;
}

export interface CollisionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
