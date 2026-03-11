import * as fs from 'fs'

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
}