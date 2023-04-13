const { v4: getUUID } = require("uuid");
const { existsSync, mkdirSync, writeFileSync } = require("fs");
const { join } = require("path");

if (!existsSync(join(process.cwd(), "codes")))
  mkdirSync(join(process.cwd(), "codes"));

if (!existsSync(join(process.cwd(), "outputs")))
  mkdirSync(join(process.cwd(), "outputs"));

//test cases for one problem
const testCases = [
  {
    num: 1,
    input: ["123", 6],
    expectedOutput: "[['1*2*3', '1+2+3'], ['1+2+3', '1*2*3']]",
    funcName: "why_im_better_than_your_seniours",
  },
  {
    num: 2,
    input: ["232", 8],
    expectedOutput: "[['2+3*2','2*3+2']]",
    funcName: "why_im_better_than_your_seniours",
  },
  {
    num: 3,
    input: ["3456237490", 9191],
    expectedOutput: "[[]]",
    funcName: "why_im_better_than_your_seniours",
  },
];

const createCodeFile = async (language, code) => {
  const jobID = getUUID();
  const fileName = `${jobID}.${language}`;
  const filePath = join(process.cwd(), `codes/${fileName}`);

  //for all languages handle cases separately
  try {
    if (language === "py") {
      for (const test of testCases) {
        const funcOutput = `${test.funcName}('${test.input[0]}', ${test.input[1]})`;
        if (language === "py") {
          code += `\ntestOutcome = ${funcOutput}`;
          code += `\nif(testOutcome not in ${test.expectedOutput}):`;
          code += `\n\tprint("Test No ${test.num} failed expected", ${test.expectedOutput}, "but got", testOutcome)`;
          code += `\nelse:`;
          code += `\n\tprint('Test No ${test.num} successfully passed')`;
        }
      }
    }

    await writeFileSync(filePath, code?.toString());
  } catch (error) {
    console.log(error);
  }

  return {
    fileName,
    filePath,
    jobID,
  };
};

module.exports = {
  createCodeFile,
};
