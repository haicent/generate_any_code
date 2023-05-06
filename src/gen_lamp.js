const util = require("./lib/util");

console.log(
  "\n\n\n\n ########################################################### 信号灯消息内容 -----> \n"
);
util.genCode([
  {
    structName: "Lamp",
    structComment: "0180-灯组灯色和色步信息",
    fields: util.textToFields("0180/灯组灯色和色步信息.txt"),
  },
  {
    structName: "lampUp",
    structComment: "0180-信号灯消息内容",
    fields: util.textToFields("0180/信号灯消息内容.txt"),
  },
]);

