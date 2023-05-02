import { expect, test } from "@playwright/test";

import { signIn } from "./utils/signin";

test("Post tweet with Images", async ({ page }) => {
  await signIn(page);

  const uploadButton = page
    .getByRole("tabpanel", { name: "Following" })
    .locator("#uploadImage");
  await uploadButton.setInputFiles("e2e/img/test.png");
  await expect(page.getByRole("img", { name: "images" }).first()).toBeVisible();

  await uploadButton.setInputFiles("e2e/img/test2.png");
  await expect(page.getByRole("img", { name: "images" }).nth(1)).toBeVisible();
  const closeButton = page.locator("#closeButton-1");
  await closeButton.click();
  await expect(
    page.getByRole("img", { name: "images" }).nth(1)
  ).not.toBeVisible();

  await uploadButton.setInputFiles("e2e/img/test2.png");
  await expect(page.getByRole("img", { name: "images" }).nth(1)).toBeVisible();

  await page
    .getByRole("textbox", { name: "Tweet" })
    .fill("Do tweet with image");
  const responsePromise = page.waitForResponse(/createTweet/);
  await page.getByRole("button", { name: "Tweet" }).click();
  // wait for response
  const response = await responsePromise;
  const responseBody = (await response.json()) as unknown;
  // get the id of the response
  const id = responseBody[0].result.data.json.id as unknown as string;

  //expect to get the success message notification
  await expect(page.getByText("Tweet posted")).toBeVisible();

  // go to the tweet page
  await page.goto(`/tweet/${id}`);
  await expect(page.getByText("Do tweet with image")).toBeVisible();
  await page.screenshot({
    path: "results/post2images.png",
    fullPage: true,
  });
});
