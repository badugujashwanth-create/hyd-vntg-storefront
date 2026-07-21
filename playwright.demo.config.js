import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './scripts',
  testMatch: 'demo.spec.ts',
  workers: 1,
  reporter: 'line',
});
