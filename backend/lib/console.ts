export {};

const colors = require("colors");

exports.red = (str: any) => {
  console.log(colors.red(str));
};

exports.green = (str: any) => {
  console.log(colors.green(str));
};

exports.yellow = (str: any) => {
  console.log(colors.yellow(str));
};

exports.grey = (str: any) => {
  console.log(colors.grey(str));
};

exports.gray = (str: any) => {
  console.log(colors.gray(str));
};
