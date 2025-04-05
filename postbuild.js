const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "docs");
fs.writeFileSync(path.join(outputDir, ".nojekyll"), "");

console.log(".nojekyll file created in docs/");