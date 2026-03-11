import * as fs from 'fs'
import { exec } from 'child_process'

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
    exec(`steam -applaunch 1118310 -L "/home/hazy/.local/share/Steam/steamapps/common/RetroArch/cores/mgba_libretro.so" "${path}"`, (error, stdout, stderr) => {
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