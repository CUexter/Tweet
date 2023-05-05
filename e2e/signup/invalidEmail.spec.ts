import { test } from '@playwright/test';

test('Invalid Email', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Your name').click();
  await page.getByPlaceholder('Your name').fill('testingnoEmail');
  await page.getByPlaceholder('your@email.com').click();
  await page.getByPlaceholder('Your password', { exact: true }).click();
  await page.getByPlaceholder('Your password', { exact: true }).fill('12345678');
  await page.getByPlaceholder('Confirm your password').click();
  await page.getByPlaceholder('Confirm your password').fill('12345678');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({
    path: "results/signup/emptyEmail.png",
    fullPage: true,
  });
  await page.getByPlaceholder('your@email.com').fill('nonono');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({
    path: "results/signup/invalidEmail1.png",
    fullPage: true,
  });
  await page.getByPlaceholder('your@email.com').fill('nonono@');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({
    path: "results/signup/invalidEmail2.png",
    fullPage: true,
  });
  await page.getByPlaceholder('your@email.com').fill('@.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({
    path: "results/signup/invalidEmail3.png",
    fullPage: true,
  });
  await page.getByPlaceholder('your@email.com').fill('.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({
    path: "results/signup/invalidEmail4.png",
    fullPage: true,
  });
  await page.getByPlaceholder('your@email.com').fill('.');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({
    path: "results/signup/invalidEmail5.png",
    fullPage: true,
  });
  await page.getByPlaceholder('your@email.com').fill('@.');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({
    path: "results/signup/invalidEmail6.png",
    fullPage: true,
  });
});