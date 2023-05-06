var resumePdfToJson = require("resume-pdf-to-json");

const pdf_path =
  "/Users/fy/work/pdf-parser/doc/T∕ITS 0180.1-2021 车路协同信息交互技术要求 第1部分：路侧设施与云控平台.pdf";

resumePdfToJson(pdf_path).then(function (data) {
    console.log(data);
});
