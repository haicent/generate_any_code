const ejs = require('ejs');
const fs = require("fs");
const templateContent = fs.readFileSync(
  "/Users/fy/work/pdf-parser/src/template.ejs"
);
// console.log(templateContent.toString());
var data = {
  structName: "Alan",
  structComment: "Somewhere, TX",
  fields: [
    { fieldType: "int", fieldName: "age", fieldComment: "jksldf" },
    { fieldType: "std::string", fieldName: "name", fieldComment: "234234234" },
  ],
};
var code = ejs.render(templateContent.toString(), data);
console.log(code);