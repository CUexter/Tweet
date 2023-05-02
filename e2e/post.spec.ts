import { expect, test } from "@playwright/test";

import { signIn } from "./utils/signin";

test("Post tweet", async ({ page }) => {
  await signIn(page);
  const responsePromise = page.waitForResponse(/createTweet/);
  await page.getByRole("textbox", { name: "Tweet" }).fill("do tweet");
  await page.getByRole("button", { name: "Tweet" }).click();
  // wait for response
  const response = await responsePromise;
  const responseBody = (await response.json()) as unknown;
  // get the id of the response
  const id = responseBody[0].result.data.json.id as unknown as string;

  //expect to get the success message notification
  await expect(page.getByText("Tweet posted")).toBeVisible();

  // go to the profile page
  await page.goto("/profile/uid1");
  // go to the tweet
  const tweet = page.locator(`#Tweet${id}`);
  await expect(tweet.getByText("do Tweet")).toBeVisible();
});
