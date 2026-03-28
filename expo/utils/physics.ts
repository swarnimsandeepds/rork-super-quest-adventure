import { CollisionBox, Player, Platform, Coin, Enemy } from "@/types/game";

export const GRAVITY = 0.8;
export const JUMP_FORCE = -15;
export const MOVE_SPEED = 5;
export const MAX_FALL_SPEED = 20;
export const FRICTION = 0.85;

export function checkCollision(
  box1: CollisionBox,
  box2: CollisionBox
): boolean {
  return (
    box1.x < box2.x + box2.width &&
    box1.x + box1.width > box2.x &&
    box1.y < box2.y + box2.height &&
    box1.y + box1.height > box2.y
  );
}

export function checkPlatformCollision(
  player: Player,
  platform: Platform
): "top" | "bottom" | "left" | "right" | null {
  const playerBox: CollisionBox = {
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
  };

  const platformBox: CollisionBox = {
    x: platform.x,
    y: platform.y,
    width: platform.width,
    height: platform.height,
  };

  if (!checkCollision(playerBox, platformBox)) {
    return null;
  }

  const playerBottom = player.y + player.height;
  const playerTop = player.y;
  const playerLeft = player.x;
  const playerRight = player.x + player.width;

  const platformTop = platform.y;
  const platformBottom = platform.y + platform.height;
  const platformLeft = platform.x;
  const platformRight = platform.x + platform.width;

  const overlapTop = playerBottom - platformTop;
  const overlapBottom = platformBottom - playerTop;
  const overlapLeft = playerRight - platformLeft;
  const overlapRight = platformRight - playerLeft;

  const minOverlap = Math.min(
    overlapTop,
    overlapBottom,
    overlapLeft,
    overlapRight
  );

  if (minOverlap === overlapTop && player.velocity.y > 0) {
    return "top";
  } else if (minOverlap === overlapBottom && player.velocity.y < 0) {
    return "bottom";
  } else if (minOverlap === overlapLeft) {
    return "left";
  } else if (minOverlap === overlapRight) {
    return "right";
  }

  return null;
}

export function applyGravity(player: Player): Player {
  const newVelocityY = Math.min(player.velocity.y + GRAVITY, MAX_FALL_SPEED);

  return {
    ...player,
    velocity: {
      ...player.velocity,
      y: newVelocityY,
    },
  };
}

export function applyFriction(player: Player): Player {
  return {
    ...player,
    velocity: {
      ...player.velocity,
      x: player.velocity.x * FRICTION,
    },
  };
}

export function updatePlayerPosition(player: Player): Player {
  return {
    ...player,
    x: player.x + player.velocity.x,
    y: player.y + player.velocity.y,
  };
}

export function handlePlatformCollisions(
  player: Player,
  platforms: Platform[]
): Player {
  let updatedPlayer = { ...player };
  let isOnGround = false;

  for (const platform of platforms) {
    const collision = checkPlatformCollision(updatedPlayer, platform);

    if (collision === "top") {
      updatedPlayer.y = platform.y - updatedPlayer.height;
      updatedPlayer.velocity.y = 0;
      updatedPlayer.isJumping = false;
      isOnGround = true;
    } else if (collision === "bottom") {
      updatedPlayer.y = platform.y + platform.height;
      updatedPlayer.velocity.y = 0;
    } else if (collision === "left") {
      updatedPlayer.x = platform.x - updatedPlayer.width;
      updatedPlayer.velocity.x = 0;
    } else if (collision === "right") {
      updatedPlayer.x = platform.x + platform.width;
      updatedPlayer.velocity.x = 0;
    }
  }

  updatedPlayer.isOnGround = isOnGround;
  return updatedPlayer;
}

export function checkCoinCollision(player: Player, coin: Coin): boolean {
  if (coin.collected) return false;

  const playerBox: CollisionBox = {
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
  };

  const coinBox: CollisionBox = {
    x: coin.x,
    y: coin.y,
    width: coin.width,
    height: coin.height,
  };

  return checkCollision(playerBox, coinBox);
}

export function checkEnemyCollision(player: Player, enemy: Enemy): boolean {
  const playerBox: CollisionBox = {
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
  };

  const enemyBox: CollisionBox = {
    x: enemy.x,
    y: enemy.y,
    width: enemy.width,
    height: enemy.height,
  };

  return checkCollision(playerBox, enemyBox);
}
