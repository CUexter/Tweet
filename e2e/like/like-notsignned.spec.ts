import { test } from '@playwright/test';

test('Like without signning in', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('.mantine-Group-root > div:nth-child(2) > div > button').first().click();
  await page.screenshot({
    path: "results/like/like-notsigned.png",
    fullPage: true,
  });
});

test('Dislike without signning in', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.locator('.mantine-Group-root > div:nth-child(2) > div > button:nth-child(2)').first().click();
  await page.screenshot({
		path: "results/like/dislike-notsigned.png",
		fullPage: true,
	});
});