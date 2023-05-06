const util = require("./lib/util");

// 生成设备基础信息接口
console.log(
  "\n\n\n\n ########################################################### 生成设备基础信息接口 -----> \n"
);
util.genCode([
  {
    structName: "sensorStatus",
    structComment: "0180-感知设备状态信息",
    fields: util.textToFields("0180/感知设备状态信息.txt"),
  },
  {
    structName: "rsuStatus",
    structComment: "0180-RSU 状态信息",
    fields: util.textToFields("0180/RSU 状态信息.txt"),
  },
  {
    structName: "fault",
    structComment: "RSCU 接入设备的故障列表",
    fields: util.textToFields("0180/RSCU 接入设备的故障列表.txt"),
  },
  {
    structName: "runStatus",
    structComment: "0180-RSCU 向云控平台上报的运行状态信息",
    fields: util.textToFields("0180/RSCU 向云控平台上报的运行状态信息.txt"),
  },
]);

