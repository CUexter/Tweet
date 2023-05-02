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
  await page.getByLabel("Password").press("Enter");

  // Make sure go back to the front page
  await expect(page).toHaveURL("/");
  // Have sign in avatar on the top right
  await expect(
    page.getByRole("banner").getByRole("button").nth(1)
  ).toBeVisible();
  // Make sure the sigin in button is gone
  await expect(signInButton).not.toBeVisible();

  // Log out
  await page.getByRole("banner").getByRole("button").nth(1).click();
  await page.getByRole("menuitem", { name: "Logout" }).click();
  //wait and make sure they Go to main page
  await expect(page).toHaveURL("/");
  //new page
  const newSignInButton = page.getByRole("button", { name: "Sign in" });
  await expect(newSignInButton).toBeVisible();
});

test("Sign In with wrong password", async ({ page }) => {
  await page.goto("/");
  //get Sign In button
  const signInButton = page.getByRole("button", { name: "Sign in" });
  await signInButton.click();

  // Fill In Stuff
  await page.getByLabel("Tag name Or Email").fill("alice2733");
  await page.getByLabel("Password").fill("aliceisnotcute");
  await page.getByRole("button", { name: "Sign in with Credentials" }).click();

  // We finished it
  const errormsg = page.getByText(
    "Sign in failed. Check the details you provided are correct."
  );

  await expect(errormsg).toBeVisible();

  // Make sure it doesn't go back to the front page
  await expect(page).not.toHaveURL("/");

  // Go back to front page, make sure don't have sign in avatar on the top right
  await page.goto("/");
  // Make sure the sigin in button is here
  await expect(signInButton).toBeVisible();
});

test("Sign In with email and password", async ({ page }) => {
  await page.goto("/");
  //get Sign In button
  const signInButton = page.getByRole("button", { name: "Sign in" });
  await expect(signInButton).toBeVisible();
  await signInButton.click();
  // Expect got to sign in page
  await expect(page).toHaveURL(/\/api\/auth\/signin?/);
  // Fill In Stuff
  await page.getByLabel("Tag name Or Email").fill("alice@gmail.com");
  await page.getByLabel("Password").fill("aliceiscute");
  await page.getByLabel("Password").press("Enter");

  // Make sure go back to the front page
  await expect(page).toHaveURL("/");
});
