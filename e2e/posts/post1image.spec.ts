/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect, test } from "@playwright/test";

import { signIn } from "../utils/signin";

// Test case: only 1 image
test("Post tweet with 1 Image", async ({ page }) => {
  await signIn(page);

  const uploadButton = page
    .getByRole("tabpanel", { name: "Following" })
    .locator("#uploadImage");
  await uploadButton.setInputFiles("e2e/img/test.png");
  await expect(page.getByRole("img", { name: "images" }).first()).toBeVisible();

  await page
    .getByRole("textbox", { name: "Tweet" })
    .fill("Do tweet with 1 image");

  await page.screenshot({
    path: "results/post/1imageWriting.png",
    fullPage: true,
  });

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
  await expect(page.getByText("Do tweet with 1 image")).toBeVisible();
  await page.screenshot({
    path: "results/post/1images.png",
    fullPage: true,
  });
});
