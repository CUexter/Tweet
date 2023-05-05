import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Your name').click();
  await page.getByPlaceholder('Your name').fill('okokok');
  await page.getByPlaceholder('Your name').press('Tab');
  await page.getByPlaceholder('your@email.com').fill('ok2@gmail.com');
  await page.getByPlaceholder('your@email.com').press('Tab');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({
    path: "results/signup/invalidName1.png",
    fullPage: true,
  });
  await page.getByPlaceholder('Your password', { exact: true }).fill('1');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({
    path: "results/signup/invalidName2.png",
    fullPage: true,
  });
  await page.getByPlaceholder('Confirm your password').fill('1');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({
    path: "results/signup/invalidName3.png",
    fullPage: true,
  });
});