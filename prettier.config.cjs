/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
  ],
  importOrder: [
    "<TYPES>",
    "<TYPES>^[./]",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^[./]",
  ],
  importOrderSortSpecifiers: true,
};
