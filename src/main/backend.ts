import { ipcMain } from "electron";
import * as fs from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { searchFolderForRoms, loadRom } from './roms'
import { window } from './window'

interface RomLocation {
    name: string
    ext: string
    location: string
}

interface Config {
    background: string,
    locations: RomLocation[]
    retroarch_location: string
}

export let conf: Config;

function readConfigFile()  {
    // No need for checking if the file exists because we already do that below
    
    const configFileLocation = join(homedir(), ".config/latte/latte.json");
    const loadedConfig = fs.readFileSync(configFileLocation, 'utf-8');
    const config: Config = JSON.parse(loadedConfig);
    conf = config;
    
    // Find the steam install location using find
    // Since steam is having issue's installing on my laptop
    // I will hardcode the install location
    
    const steamInstallLocation = join(homedir(), ".steam/steam/steamapps")
    
    // Once this is complete, scan each of the rom folders for roms
    // This location is set inside the config
    config.locations.forEach((directory) => {
        const roms = searchFolderForRoms(directory.location);
        if (roms != null) {
            window.webContents.send('gba-roms', roms);
        } else {
            console.log("Loading roms error");
        }
    })
        
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

    console.log("Config location exists")

    
    // Check if the config file exists in the config location
    // If the config file does not exist then load a default config
    if (!fs.existsSync(join(baseConfigLocation, "latte.json"))) {
        console.log("Config file does not exist in " + baseConfigLocation);
        console.log("Creating baic config file...");
        
        const defaultConfig = {
            "background": "",
            "locations": [
                {
                    "name": "gameboy advanced",
                    "ext": "gba",
                    "location": ""
                }
            ],
            "retroarch_location": ""
        };
    
        fs.writeFileSync(join(baseConfigLocation, "latte.json"), JSON.stringify(defaultConfig, null, 4));
        console.log("Config file created at " + join(baseConfigLocation, "latte.json").toString());
    }

    
    return readConfigFile();
}

export function setIpcFuncs() {
    ipcMain.on('ping', () => console.log('pong'));
    ipcMain.handle('cmd:readConfigDirectory', readConfigDirectory);
    ipcMain.handle('cmd:loadRom', (_event, path: string ) => loadRom(path));   
}