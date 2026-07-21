import { expect, test } from '@playwright/test';

test('prepares a complete local order preview without external handoff', async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Primary order workflow runs once on desktop.');
  let popupCount = 0;
  context.on('page', () => { popupCount += 1; });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: /hyd vintage/i })).toBeVisible();
  await page.getByRole('button', { name: 'Vintage Tees' }).click();
  await expect(page.locator('#collection').getByRole('heading', { name: 'Black 705 Tee' })).toBeVisible();

  await page.locator('#collection article').filter({ hasText: 'Black 705 Tee' }).getByRole('button', { name: /order via whatsapp/i }).click();
  const dialog = page.getByRole('dialog', { name: 'Black 705 Tee' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close order form' })).toBeFocused();
  await page.getByRole('button', { name: 'L', exact: true }).click();
  await page.getByLabel('Name').fill('Demo Buyer');
  await page.getByLabel('Phone').fill('9000000000');
  await page.getByLabel('Address').fill('Synthetic address, Hyderabad 500000');
  await page.getByRole('button', { name: 'Preview Order Message' }).click();

  await expect(page.getByText('Local message preview — not sent')).toBeVisible();
  await expect(page.getByText(/Product: Black 705 Tee/)).toBeVisible();
  await expect(page.getByText(/Size: L/)).toBeVisible();
  expect(popupCount).toBe(0);
})

test('admin fails closed without external or local-demo configuration', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'Admin failure workflow runs once on desktop.');
  await page.goto('/admin');
  await expect(page.getByText(/Admin access is disabled/i)).toBeVisible();
  await page.getByLabel('Email').fill('admin@example.test');
  await page.getByLabel('Password').fill('not-a-real-password');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText(/Local admin access is disabled/i)).toBeVisible();
})

test('mobile navigation and catalog avoid horizontal overflow', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'Mobile-only responsive check.');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('link', { name: 'Admin Dashboard', exact: true }).first()).toBeVisible();
  const widths = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(widths.scrollWidth).toBeLessThanOrEqual(widths.clientWidth);
})
