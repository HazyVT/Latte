import { ipcMain } from "electron";
import * as fs from 'fs';
import { join } from 'path';
import { homedir } from 'os';

function readConfigFile()  {
    // No need for checking if the file exists because we already do that below
    
    const configFileLocation = join(homedir(), ".config/latte/latte.json");
    const loadedConfig = fs.readFileSync(configFileLocation, 'utf-8');
    const config = JSON.parse(loadedConfig);
    return config;
    
}

function readConfigDirectory(): any {
    
    const baseConfigLocation = join(homedir(), ".config/latte");
    console.log(homedir());
    
    // Check if config location exists
    // If the location does not exist then make it
    if (!fs.existsSync(baseConfigLocation)) {
        console.log("Config location does not exist");
        console.log("Creating config location...");        
        // Make config directory 
        fs.mkdirSync(baseConfigLocation, { recursive: true })
        console.log("Config location created at " + baseConfigLocation);
    }

    
    // Check if the config file exists in the config location
    // If the config file does not exist then load a default config
    if (!fs.existsSync(join(baseConfigLocation, "latte.json"))) {
        console.log("Config file does not exist in " + baseConfigLocation);
        console.log("Creating baic config file...");
        
        const defaultConfig = {
            "background": "",
            "locations": [
                {
                    "gba": ""
                }
            ]
        };
    
        fs.writeFileSync(join(baseConfigLocation, "latte.json"), JSON.stringify(defaultConfig, null, 4));
        console.log("Config fiel creaetd at " + join(baseConfigLocation, "latte.json").toString());
    }
    
    return readConfigFile();
}

export function setIpcFuncs() {
      ipcMain.on('ping', () => console.log('pong'));
      ipcMain.handle('cmd:readConfigDirectory', readConfigDirectory);
      
}