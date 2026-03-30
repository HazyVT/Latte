#include <raylib.h>

int main() {
  // No need to worry about scaling since its made for speficic screen size
  SetConfigFlags(FLAG_MSAA_4X_HINT | FLAG_VSYNC_HINT | FLAG_BORDERLESS_WINDOWED_MODE);
  InitWindow(1280, 800, "Latte");

  while (!WindowShouldClose()) {
    BeginDrawing();

    EndDrawing();
  }

  CloseWindow();
  return 0;
}
