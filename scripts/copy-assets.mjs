import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";

const sourceRoot = fileURLToPath(new URL("../src", import.meta.url));
const outputRoot = fileURLToPath(new URL("../dist", import.meta.url));

await mkdir(`${outputRoot}/assets`, { recursive: true });
await Promise.all([
  copyFile(
    `${sourceRoot}/assets/FZLanTYJW_Zhong.TTF`,
    `${outputRoot}/assets/FZLanTYJW_Zhong.TTF`,
  ),
  writeFile(
    `${outputRoot}/legacy-font.css`,
    `@font-face {\n  font-family: 'CuteUiLegacyDialog';\n  src: url('./assets/FZLanTYJW_Zhong.TTF') format('truetype');\n  font-display: swap;\n}\n\n.cute-ui-legacy-font {\n  --cute-dialog-font-family: 'CuteUiLegacyDialog', ui-rounded, 'PingFang SC', sans-serif;\n}\n`,
    "utf8",
  ),
]);

console.log("Copied opt-in legacy font assets.");
