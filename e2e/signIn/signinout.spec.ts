import { expect, test } from "@playwright/test";

test("Sign In and Out with TagName and password", async ({ page }) => {
  await page.goto("/");
  //get Sign In button
  const signInButton = page.getByRole("button", { name: "Sign in" });
  await expect(signInButton).toBeVisible();
  await signInButton.click();
  // Expect got to sign in page
  await expect(page).toHaveURL(/\/api\/auth\/signin?/);
  // Fill In Stuff
  await page.getByLabel("Tag name Or Email").fill("alice2733");
  await page.getByLabel("Password").fill("aliceiscute");

  await page.screenshot({
    path: "results/signin/corrct.png",
    fullPage: true,
  });
  await page.getByLabel("Password").press("Enter");

  // Make sure go back to the front page
  await expect(page).toHaveURL("/");

  // Have sign in avatar on the top right
  await expect(
    page.getByRole("banner").getByRole("button").nth(1)
  ).toBeVisible();

  await page.screenshot({
    path: "results/signin/success.png",
    fullPage: true,
  });
  // Make sure the sigin in button is gone
  await expect(signInButton).not.toBeVisible();

  // Log out
  await page.getByRole("banner").getByRole("button").nth(1).click();
  await page.getByRole("menuitem", { name: "Logout" }).click();
  await page.screenshot({
    path: "results/signin/LogoutButtonVisible.png",
    fullPage: true,
  });
  //wait and make sure they Go to main page
  await expect(page).toHaveURL("/");
  //new page
  const newSignInButton = page.getByRole("button", { name: "Sign in" });
  await expect(newSignInButton).toBeVisible();
  await page.screenshot({
    path: "results/signin/SuccessLogout.png",
    fullPage: true,
  });
});
