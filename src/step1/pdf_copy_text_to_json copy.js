const readline = require("readline");
const path = require("path");
const fs = require("fs");

textToJson("../0180/RSU 设备基础信息.txt");
// textToJson("../0180/感知设备基础信息.txt");
// textToJson("../0180/RSCU 设备基础信息.txt");

function textToJson(rPath) {
  let filepath = path.join(__dirname, rPath);
  let input = fs.createReadStream(filepath);
  const rl = readline.createInterface({
    input: input,
  });
  var i = 1;
  var ret = [];
  var obj = {};
  rl.on("line", (line) => {
    try {
      var reg = /^[0-9]*$/;
      if (reg.test(line)) {
        i = 1;
        obj = {};
        console.log("\n");
      }
      switch (i) {
        case 1:
          obj.id = line;
          break;
        case 2:
          obj.fieldName = line;
          break;
        case 3:
          obj.fieldRequired =  line;
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
    console.log(JSON.stringify(ret));
    i++;
  });
  rl.on("close", (line) => {
    console.log("\n\n请复制最后一条数据！");
  });
}
