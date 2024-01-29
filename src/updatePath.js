import fs from "fs";

export function updatePath(path) {
 return fs.writeFileSync("./.path.txt", path);
}
