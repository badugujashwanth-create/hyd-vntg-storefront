import { expect, test } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const baseUrl = process.env.DEMO_BASE_URL;
if (!baseUrl) throw new Error('Set DEMO_BASE_URL to the healthy local application URL.');

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test.use({
  viewport: { width: 1280, height: 720 },
  video: { mode: 'on', size: { width: 1280, height: 720 } },
});

test('HYD VNTG deterministic storefront walkthrough', async ({ page, context }) => {
  test.setTimeout(300_000);
  let popupCount = 0;
  context.on('page', () => { popupCount += 1; });

  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: /hyd vintage/i })).toBeVisible();
  await page.screenshot({ path: path.join(repositoryRoot, 'docs/demo/demo-thumbnail.png') });
  await page.waitForTimeout(15_000);

  await page.locator('#drops').scrollIntoViewIfNeeded();
  await page.waitForTimeout(15_000);

  await page.locator('#collection').scrollIntoViewIfNeeded();
  await page.waitForTimeout(12_000);
  await page.getByRole('button', { name: 'Vintage Tees' }).click();
  await page.waitForTimeout(14_000);

  await page.locator('#collection article').filter({ hasText: 'Black 705 Tee' }).getByRole('button', { name: /order via whatsapp/i }).click();
  const dialog = page.getByRole('dialog', { name: 'Black 705 Tee' });
  await expect(dialog).toBeVisible();
  await page.waitForTimeout(12_000);

  await dialog.getByRole('button', { name: 'L', exact: true }).click();
  await dialog.getByLabel('Name').fill('Demo Buyer');
  await dialog.getByLabel('Phone').fill('9000000000');
  await dialog.getByLabel('Address').fill('Synthetic address, Hyderabad 500000');
  await page.waitForTimeout(14_000);

  await dialog.getByRole('button', { name: 'Preview Order Message' }).click();
  await expect(dialog.getByText('Local message preview — not sent')).toBeVisible();
  expect(popupCount).toBe(0);
  await dialog.getByText('Local message preview — not sent').scrollIntoViewIfNeeded();
  await page.waitForTimeout(24_000);

  await dialog.getByRole('button', { name: 'Close order form' }).click();
  await page.waitForTimeout(10_000);

  await page.goto(`${baseUrl}/admin`, { waitUntil: 'networkidle' });
  await expect(page.getByText(/Admin access is disabled/i)).toBeVisible();
  await page.waitForTimeout(15_000);
  await page.getByLabel('Email').fill('admin@example.test');
  await page.getByLabel('Password').fill('not-a-real-password');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText(/Local admin access is disabled/i)).toBeVisible();
  await page.waitForTimeout(18_000);

  await page.getByRole('link', { name: 'Back to Store' }).click();
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(16_000);

  await page.getByRole('link', { name: /hyd vntg/i }).first().click();
  await page.waitForTimeout(25_000);
});
