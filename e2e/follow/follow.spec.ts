import { test } from '@playwright/test';

// Test following when not logged in
test('Follow when not logged in', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Alice Li 2023-04-28T17:48:20+08:00' }).click();
  await page.getByRole('button', { name: 'Unfollow' }).click();
  await page.getByRole('button', { name: 'Unfollow' }).click();
  await page.getByRole('button', { name: 'Unfollow' }).click();
  await page.screenshot({
    path: "results/follow/follow-notsigned.png",
    fullPage: true,
  });
});

test('Follow', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('tab', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Alice Li 2023-04-28T17:48:20+08:00' }).click();
  await page.getByRole('button', { name: 'Follow' }).click();
  await page.screenshot({
    path: "results/follow/follow.png",
    fullPage: true,
  });
});

test('Unfollow', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Alice Li 2023-04-28T17:48:20+08:00' }).click();
  await page.getByRole('button', { name: 'Unfollow' }).click();
  await page.screenshot({
    path: "results/follow/unfollow.png",
    fullPage: true,
  });
});