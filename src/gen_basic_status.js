const util = require("./lib/util");

// 生成设备基础信息接口
console.log(
  "\n\n\n\n ########################################################### 生成设备基础信息接口 -----> \n"
);
util.genCode([
  {
    structName: "sensor",
    structComment: "0180-感知设备基础信息",
    fields: util.textToFields("0180/感知设备基础信息.txt"),
  },
  {
    structName: "rsu",
    structComment: "0180-RSU设备基础信息",
    fields: util.textToFields("0180/RSU 设备基础信息.txt"),
  },
  {
    structName: "basicStatus",
    structComment: "0180-设备基础信息",
    fields: util.textToFields("0180/RSCU 设备基础信息.txt"),
  },
]);

