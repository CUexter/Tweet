/* eslint-disable import/no-anonymous-default-export */
import micromatch from "micromatch";

export default (allStagedFile) => {
  let jsFiles = micromatch(allStagedFile, ["**/*.{js,ts,tsx,jsx}"]);
  jsFiles = micromatch.not(jsFiles, "**/pb/pb_migrations/*.js");
  let codeFiles = micromatch(allStagedFile, [
    "**/*.{js,ts,tsx,jsx,html,css,scss}",
  ]);
  codeFiles = micromatch.not(jsFiles, "**/pb/pb_migrations/*.js");

  const cssFiles = micromatch(allStagedFile, ["**/*.css"]);
  const scssFiles = micromatch(allStagedFile, ["**/*.scss"]);

  let operations = [
    `prettier --write --ignore-unknown ${allStagedFile.join(" ")}`,
  ];

  if (codeFiles.length > 0) {
    operations.push("pnpm run test:e2e");
  }

  if (cssFiles.length > 0) {
    operations.push(`stylelint --fix ${cssFiles.join(" ")}`);
  }
  if (scssFiles.length > 0) {
    operations.push(`stylelint --syntax=scss --fix ${scssFiles.join(" ")}`);
  }

  if (jsFiles.length > 0) {
    operations.push(`eslint --cache --fix ${jsFiles.join(" ")}`);
    operations.push("pnpm run test");
  }

  return operations;
};
