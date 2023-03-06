import { loadEnvConfig } from "@next/env";
import { test as setup } from "@playwright/test";

loadEnvConfig(process.cwd());

const authFile = "e2e/.auth/user.json";

setup.skip("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://discord.com/login");
  await page.getByLabel("Email or Phone Number*").fill(process.env.TEST_EMAIL!);
  await page.getByLabel("Password*").fill(process.env.TEST_PW!);
  await page.getByRole("button", { name: "Log In" }).click();
  // End of authentication steps.

  await page.waitForURL("https://discord.com/channels/@me");
  await page.context().storageState({ path: authFile });
});
