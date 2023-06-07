const fs = require("fs");

const readStream = fs.createReadStream("./blogText.txt", { encoding: "utf8" });
const writeStream = fs.createWriteStream("./blog3.txt");

/* readStream.on("data", (chunk) => {
  writeStream.write("\n NEW CHUNK\n");
  writeStream.write(chunk);
});
 */

// using pipe instead

readStream.pipe(writeStream);
