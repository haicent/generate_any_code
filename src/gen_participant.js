const util = require("./lib/util");

console.log(
  "\n\n\n\n ########################################################### 交通参与者信息 -----> \n"
);
util.genCode([
  // TODO: participant中有需要补充的结构
  // {
  //   structName: "sensorStatus",
  //   structComment: "0180-感知设备状态信息",
  //   fields: util.textToFields("0180/感知设备状态信息.txt"),
  // },
  // {
  //   structName: "rsuStatus",
  //   structComment: "0180-RSU 状态信息",
  //   fields: util.textToFields("0180/RSU 状态信息.txt"),
  // },
  {
    structName: "ptc",
    structComment: "0180-交通参与者列表",
    fields: util.textToFields("0180/交通参与者列表.txt"),
  },
  {
    structName: "participant",
    structComment: "0180-交通参与者信息",
    fields: util.textToFields("0180/交通参与者信息.txt"),
  },
]);

