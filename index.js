const fs = require("fs");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

fs.readdir(path.join(path.resolve(), "scripts"), (err, files) => {
  if (err) {
    return console.log("error in read directory => ", err);
  }

  let js_files = files.filter((i) => i.endsWith(".js"));
  if (js_files.length > 0) {
    fs.mkdirSync(path.join(path.resolve(), "obfuscate_scripts"));
  }
  let output_path = path.join(path.resolve(), "obfuscate_scripts");
  js_files.forEach((f) => {
    let file_path = path.join(path.resolve(), "scripts", f);
    fs.readFile(file_path, (err, data) => {
      if (err) {
        return console.log(`error in read file => `, err);
      }
      const obfuscationResult = JavaScriptObfuscator.obfuscate(data.toString(), {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1,
      });
      fs.writeFileSync(path.join(output_path, f), obfuscationResult.getObfuscatedCode());
    });
  });
});
