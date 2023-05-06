const util = require("./lib/util");

console.log(
  "\n\n\n\n ########################################################### 交通事件信息 -----> \n"
);
util.genCode([
  // TODO: participant中有需要补充的结构
  {
    structName: "laneFlowData",
    structComment: "0180-车道级别交通指标",
    fields: util.textToFields("0180/车道级别交通指标.txt"),
  },
  {
    structName: "directionFlowData",
    structComment: "0180-流向级别交通指标",
    fields: util.textToFields("0180/流向级别交通指标.txt"),
  },
  {
    structName: "traffic",
    structComment: "0180-交通运行状况信息",
    fields: util.textToFields("0180/交通运行状况信息.txt"),
  },
]);

