import * as ray from "raylib"
import Config from "./config.ts";

function main() {
  ray.InitWindow(1280, 800, "Latte");

  Config.loadConfig();

  while (!ray.WindowShouldClose()) {
    ray.BeginDrawing();

    ray.EndDrawing();
  }

  ray.CloseWindow();
}

main();
