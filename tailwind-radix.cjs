const radix = require("@radix-ui/colors");

const tailwindRadix = {};

for (const color in radix) {
  tailwindRadix[color] = {};
  for (const name in radix[color]) {
    const level = name.match(/\d+$/)[0];
    tailwindRadix[color][level] = radix[color][name];
  }
}

module.exports = tailwindRadix;
