import { test, expect } from '@playwright/test';

test('composer to export flow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Missions');
  await page.waitForTimeout(500);
  await page.click('text=Composer');
  await page.waitForTimeout(500);
  await expect(page.locator('h2')).toContainText('Composer une offre');
});
