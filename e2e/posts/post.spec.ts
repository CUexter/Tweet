import { expect, test } from "@playwright/test";

import { signIn } from "../utils/signin";

test("Post tweet", async ({ page }) => {
  await signIn(page);
  const responsePromise = page.waitForResponse(/createTweet/);
  await page.getByRole("textbox", { name: "Tweet" }).fill("do tweet");

  await page.screenshot({
    path: "results/posts/writing.png",
    fullPage: true,
  });

  await page.getByRole("button", { name: "Tweet" }).click();
  // wait for response
  const response = await responsePromise;
  const responseBody = (await response.json()) as unknown;
  // get the id of the response
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const id = responseBody[0].result.data.json.id as unknown as string;

  //expect to get the success message notification
  await expect(page.getByText("Tweet posted")).toBeVisible();

  // go to the profile page
  await page.goto("/profile/uid1");
  // go to the tweet
  const tweet = page.locator(`#Tweet${id}`);
  await expect(tweet.getByText("do Tweet")).toBeVisible();

  //
  await page.goto(`/tweet/${id}`);
  // take screenshot
  await page.screenshot({
    path: "results/posts/post.png",
    fullPage: true,
  });
});

// Test case: Post an empty tweet
test("Post empty tweet", async ({ page }) => {
  await signIn(page);
  await page.getByRole("textbox", { name: "Tweet" }).fill("");
  await page.screenshot({
    path: "results/posts/empty.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Tweet" }).click();

  // Expect to see an error message
  await expect(page.getByText("Tweet cannot be empty")).toBeVisible();
  await page.screenshot({
    path: "results/posts/empty-result.png",
    fullPage: true,
  });
});
