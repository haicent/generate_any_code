const pdfTableExtractor = require("@florpor/pdf-table-extractor");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const Chance = require("chance");
const chance = new Chance();
const readline = require("readline");

const templateContent = fs.readFileSync(path.join(__dirname, "template.ejs"));
const testContent = fs.readFileSync(path.join(__dirname, "test.ejs"));

function getFieldType(fn, ft) {
  var fieldType = "";
  switch (ft) {
    case "Long":
      fieldType = "std::int64_t";
      break;
    case "Integer":
      fieldType = "std::int32_t";
      break;
    case "String":
      fieldType = "std::string";
      break;
    case "Double":
      fieldType = "double";
      break;
    case "ENUMERATED":
      fieldType = "std::int8_t";
      break;
    case "SEQUENCE":
      fn = fn.replace("list", "");
      fn = fn.replace("List", "");
      fieldType = "std::vector<" + fn + "_t>";
      break;
    case "Boolean":
      fieldType = "bool";
      break;
    default:
      break;
  }
  return fieldType;
}
function getComment(c) {
  if (c && c.indexOf("\n") != -1) {
    return "/* " + c + " */";
  } else {
    return "// " + c;
  }
}

function getRequired(c) {
  return "// 必填否：" + c;
}

function getTestValue(ft) {
  var value = "";
  switch (ft) {
    case "Long":
      value = chance.integer({ min: 1000000, max: 10000000000000 });
      break;
    case "Integer":
      value = chance.integer({ min: 0, max: 1000 });
      break;
    case "String":
      value = '"' + chance.word() + '"';
      break;
    case "Double":
      value = chance.floating({ min: 0, max: 10000, fixed: 2 });
      break;
    case "ENUMERATED":
      value = chance.integer({ min: 0, max: 10 });
      break;
    case "SEQUENCE":
      value = "nullptr";
      break;
    case "Boolean":
      value = chance.bool();
      break;
    default:
      break;
  }
  return value;
}
function getFields(jsonPath) {
  const deviceBasicFields = fs
    .readFileSync(path.join(__dirname, jsonPath))
    .toString();

  var fields = JSON.parse(deviceBasicFields.toString());
  for (fi in fields) {
    var f = fields[fi];
    f.testValue = getTestValue(f.fieldType);
    f.fieldComment = getComment(f.fieldComment);
    f.fieldRequired = getRequired(f.fieldRequired);
    f.fieldType = getFieldType(f.fieldName, f.fieldType);
  }
  return fields;
}

// textToFields("../0180/RSU 设备基础信息.txt");
function textToFields(rPath) {
  let filepath = path.join(__dirname, "../"+rPath);
  let content = fs.readFileSync(filepath);
  let lines = content.toString().split("\n");

  var i = 1;
  var fields = [];
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
          fields.push(obj);
          break;
        default:
          break;
      }
    } catch (e) {}
    i++;
  }
  for (fi in fields) {
    var f = fields[fi];
    f.testValue = getTestValue(f.fieldType);
    f.fieldComment = getComment(f.fieldComment);
    f.fieldRequired = getRequired(f.fieldRequired);
    f.fieldType = getFieldType(f.fieldName, f.fieldType);
  }
  return fields;
}
/**
 * 生成c++ struct
 */
function genCode(dataList) {
  for (i in dataList) {
    console.log("\n\n");
    const deviceBasicStruct = ejs.render(
      templateContent.toString(),
      dataList[i]
    );
    console.log(deviceBasicStruct);
  }

  // 生成测试代码
  console.log(
    "\n\n\n\n ================================== 下面是初始化代码 ==================================\n\n"
  );
  for (i in dataList) {
    const deviceBasicTestCode = ejs.render(testContent.toString(), dataList[i]);
    console.log(deviceBasicTestCode);
  }
}


module.exports = {
    genCode: genCode,
    textToFields:textToFields
}