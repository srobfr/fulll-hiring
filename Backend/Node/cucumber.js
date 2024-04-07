const common = [
  "./features/**/*.feature",
  "--require-module ts-node/register",
  "--require ./features/steps_definitions/**/*.ts",
  "--format progress-bar",
  `--format-options '{"snippetInterface": "synchronous"}'`,
].join(" ");

module.exports = {
  default: common
};
