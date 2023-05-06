const readline = require("readline");
const path = require("path");
const fs = require("fs");

textToJson("../0180/RSU 设备基础信息.txt");
// textToJson("../0180/感知设备基础信息.txt");
// textToJson("../0180/RSCU 设备基础信息.txt");

function textToJson(rPath) {
  let filepath = path.join(__dirname, rPath);
  let content = fs.readFileSync(filepath);
  let lines = content.toString().split("\n");

  var i = 1;
  var ret = [];
  var obj = {};

  for (li in lines) {
    let line = lines[li];
    try {
      const reg = /^[0-9]*$/;
      if (reg.test(line)) {
        i = 1;
        obj = {};
      }
      switch (i) {
        case 1:
          obj.id = line;
          break;
        case 2:
          obj.fieldName = line;
          break;
        case 3:
          obj.fieldRequired = line;
          break;
        case 4:
          obj.fieldType = line;
          break;
        case 5:
          obj.fieldComment = line;
          ret.push(obj);
          break;
        default:
          break;
      }
    } catch (e) {}
    i++;
  }
  let jsonContent = JSON.stringify(ret);
  let jsonPath = rPath.replace("0180", "0180json");
  jsonPath = jsonPath.replace(".txt", ".json");
  fs.writeFileSync(path.join(__dirname, jsonPath),jsonContent.toString());
}
