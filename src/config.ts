import * as fs from "node:fs";
import * as os from "node:os";

class Config {

  /*
   * Check if the config file for latte exists
   * Default path is .config/latte/latte.json
   */
  private static checkConfigExists() {
    
    const path = `${os.homedir()}/.config/latte/latte.json`;
    if (!fs.existsSync(path)) {
      console.error("Config file does not exist");
      // Implement creating a config file later
      // this is because the format of the config file has not yet been decided upon
      return;
    }

    console.log("Config file found");
    const file = fs.readFileSync(path, "utf8");
    const config = JSON.parse(file.toString());
    console.log(config);
  }
  
  static loadConfig() {

    this.checkConfigExists()
  }
}

export default Config;
