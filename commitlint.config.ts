const config = {
  extends: ["@commitlint/config-conventional"],
  ignores: [
    (message: string) => /^Bumps \[.+]\(.+\) from .+ to .+\.$/m.test(message),
  ],
};
export default config;
