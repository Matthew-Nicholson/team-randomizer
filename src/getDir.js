import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function getDir(importMetaUrl) {
  return dirname(fileURLToPath(importMetaUrl));
}
