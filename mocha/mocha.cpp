#include <SDL2/SDL.h>
#include <iostream>

SDL_GameController *findGameController() {
    for (int i = 0; i < SDL_NumJoysticks(); i++) {
        if (SDL_IsGameController(i)) {
            return SDL_GameControllerOpen(i);
        }
    }

    return nullptr;
}

int main() {
    // Basic SDL2 initialization
    if (SDL_Init(SDL_INIT_EVENTS | SDL_INIT_GAMECONTROLLER) != 0) {
        SDL_Log("Init error");
        return 0;
    }    
    
    SDL_Log("Init success");
    
    SDL_Event event;
    bool running = true;
    
    // Check for connected gamepads on start
    SDL_GameController *controller = findGameController();
    if (controller != nullptr) {
        SDL_Log("Controller online");
    }
        
    
    while (running) {
        if (SDL_PollEvent(&event)) {
            switch (event.type) {
                case SDL_QUIT:
                    running = false;
                    break;
                case SDL_CONTROLLERDEVICEADDED:
                    // Controller gets plugged in as the program is running
                    if (controller == nullptr) {
                        controller = SDL_GameControllerOpen(event.cdevice.which);
                        SDL_Log("Controller added");
                    }
                    break;
                case SDL_CONTROLLERDEVICEREMOVED:
                    // Controller gets unplugged as the program is running
                    if (controller != nullptr && event.cdevice.which == SDL_JoystickInstanceID(
                        SDL_GameControllerGetJoystick(controller)
                    )) {
                        SDL_GameControllerClose(controller);
                        SDL_Log("Controller removed");
                        controller = findGameController();
                    }
                    break;
                case SDL_CONTROLLERBUTTONDOWN:
                    if (controller != nullptr) {
                        switch (event.cbutton.button) {
                            case SDL_CONTROLLER_BUTTON_A:
                                std::cout << "A" << std::flush;
                                break;
                            case SDL_CONTROLLER_BUTTON_B:
                                std::cout << "B" << std::flush;
                                break;
                            case SDL_CONTROLLER_BUTTON_DPAD_RIGHT:
                                std::cout << "RIGHT" << std::flush;
                                break;
                            case SDL_CONTROLLER_BUTTON_DPAD_LEFT:
                                std::cout << "LEFT" << std::flush;
                                break;
                            case SDL_CONTROLLER_BUTTON_DPAD_UP:
                                std::cout << "UP" << std::flush;
                                break;
                            case SDL_CONTROLLER_BUTTON_DPAD_DOWN:
                                std::cout << "DOWN" << std::flush;
                                break;
                            case SDL_CONTROLLER_BUTTON_START:
                                std::cout << "START" << std::flush;
                                break;
                                
                        }
                    }
                    break;
            }
        }
    }
    
    return 1;
}