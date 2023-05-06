/* eslint-disable import/no-anonymous-default-export */
import micromatch from "micromatch";

export default (allStagedFile) => {
  let jsFiles = micromatch(allStagedFile, ["**/*.{cjs,mjs,js,ts,tsx,jsx}"]);
  let e2eFiles = micromatch(allStagedFile, [
    "**/e2e/**",
    "**/src/**",
    "**/public/**",
    "**/prisma/**",
  ]);

  const cssFiles = micromatch(allStagedFile, ["**/*.css"]);
  const scssFiles = micromatch(allStagedFile, ["**/*.scss"]);

  let operations = [
    `prettier --write --ignore-unknown ${allStagedFile.join(" ")}`,
  ];

  if (e2eFiles.length > 0) {
  }

  if (cssFiles.length > 0) {
    operations.push(`stylelint --fix ${cssFiles.join(" ")}`);
  }
  if (scssFiles.length > 0) {
    operations.push(`stylelint --syntax=scss --fix ${scssFiles.join(" ")}`);
  }

  if (jsFiles.length > 0) {
    operations.push(`eslint --cache --fix ${jsFiles.join(" ")}`);
  }

  return operations;
};
