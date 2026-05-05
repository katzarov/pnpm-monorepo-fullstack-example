import { test, expect } from '@playwright/test';

test('to have text', async ({ page }) => {

  const apiUrl = process.env.API_URL;
  console.log(apiUrl);

  if (typeof apiUrl !== "string") {
    throw Error("No Api URL")
  }

  const pageText = 'Hello World from Nest!';

  await page.goto(apiUrl);
  const locator = page.getByText(pageText)

  await expect(locator).toBeVisible();
});

