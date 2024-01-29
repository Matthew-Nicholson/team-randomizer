import fs from "fs";
import { getDir } from "./getDir.js";

export function updatePath(newPath) {
 return fs.writeFileSync(path.join(getDir(import.meta.url),"..", ".config.txt"), path);
}
