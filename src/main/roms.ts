import * as fs from 'fs'
import { exec } from 'child_process'
import { conf } from './backend'
import { join } from 'path'

export function searchFolderForRoms(dirPath: string): string[] | null {
    if (!fs.existsSync(dirPath)) {
        console.log("Rom directory does not exist");
        return null;
    }

    const filesAbsPath: string[] = [];
    const files = fs.readdirSync(dirPath, { recursive: true });
    files.forEach((file) => {
        const path = `${dirPath}/${file}`;
        filesAbsPath.push(path);
    })

    return filesAbsPath;
}

export function loadRom(path: string): void {
    console.log(path);
    
    // Open retroarch with the gba rom
    exec(`steam -applaunch 1118310 -L "${join(conf.retroarch_location,"cores","mgba_libretro.so")}" "${path}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return;
        }

        if (stderr) {
            console.error(error);
            return;
        }
    })
}