import minecraft from "../config/games/minecraft.json";
import rust from "../config/games/rust.json";
import fivem from "../config/games/fivem.json";
import hytale from "../config/games/hytale.json";

export interface GamePlan {
  ram: string;
  cpu: string;
  ssd: string;
  price: number;
  link?: string;
  pid?: string | number;
}

export interface GameConfig {
  name: string;
  image: string;
  slug: string;
  heroImage: string;
  description: string;
  plans: GamePlan[];
}

export const GAME_DATA_REGISTRY: Record<string, GameConfig> = {
  minecraft: minecraft as GameConfig,
  rust: rust as GameConfig,
  fivem: fivem as GameConfig,
  hytale: hytale as GameConfig,
};