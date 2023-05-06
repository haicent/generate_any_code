const pdf_path = "/Users/fy/work/pdf-parser/doc/T∕ITS 0180.1-2021 车路协同信息交互技术要求 第1部分：路侧设施与云控平台.pdf";

var pdfUtil = require("pdf-to-text");

//option to extract text from page 0 to 10
var option = { from: 0, to: 10 };
option = {};

pdfUtil.pdfToText(pdf_path, option, function (err, data) {
  if (err) throw err;
  console.log(data); //print text
});
 