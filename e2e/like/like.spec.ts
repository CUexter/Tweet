import { test } from '@playwright/test';

test('Like', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('tab', { name: 'All' }).click();
  await page.locator('div:nth-child(3) > button').first().click();
  await page.screenshot({
    path: "results/like/like.png",
    fullPage: true,
  });
  // when liked already
  await page.locator('div:nth-child(3) > button').first().click();
  await page.screenshot({
    path: "results/like/like-liked.png",
    fullPage: true,
  });
  // when disliked already
  await page.locator('div').filter({ hasText: /^00-1$/ }).getByRole('button').nth(2).click();
  await page.screenshot({
    path: "results/like/like-disliked.png",
    fullPage: true,
  });
});


