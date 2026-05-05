import { test as teardown } from '@playwright/test';

teardown('delete infra', async ({ }) => {
  console.log('destroying test infra...');
  // Delete the infra
});