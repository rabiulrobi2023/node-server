import fs from "fs";

export const writeFile = <T>(path: string, data: T) => {
  return fs.writeFileSync(path, JSON.stringify(data));
};
