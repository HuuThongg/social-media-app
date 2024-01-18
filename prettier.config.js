// export const config = {
//   plugins: [require("prettier-plugin-tailwindcss")],
//   endOfLine: "lf",
//   semi: true,
//   trailingComma: "es6",
//   bracketSpacing: true,
//   trailingComma: "all",
//   printWidth: 80,
//   tabWidth: 2,
//   singleQuote: true,
// };

// module.exports = {
//   plugins: [require("prettier-plugin-tailwindcss")],
//   endOfLine: "lf",
//   semi: true,
//   trailingComma: "es6",
//   bracketSpacing: true,
//   trailingComma: "all",
//   printWidth: 80,
//   tabWidth: 2,
//   singleQuote: true,
// };

module.exports = {
  plugins: [import('prettier-plugin-tailwindcss')],
  endOfLine: 'lf',
  semi: true,
  trailingComma: 'all',
  bracketSpacing: true,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
};
