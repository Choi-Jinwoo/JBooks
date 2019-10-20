import * as colors from 'colors';

const red = (str: any) => {
  console.log(colors.red(str));
};

const green = (str: any) => {
  console.log(colors.green(str));
};

const yellow = (str: any) => {
  console.log(colors.yellow(str));
};

const grey = (str: any) => {
  console.log(colors.grey(str));
};

const gray = (str: any) => {
  console.log(colors.gray(str));
};

export default {
  red,
  green,
  yellow,
  grey,
  gray,
}
