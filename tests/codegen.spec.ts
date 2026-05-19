import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
 
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('start with basics');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Do samples');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await page.getByRole('listitem').filter({ hasText: 'start with basics' }).getByLabel('Toggle Todo').check();
    await page.getByRole('listitem').filter({ hasText: 'Do samples' }).getByLabel('Toggle Todo').check();
  await page.getByRole('listitem').filter({ hasText: 'start with basics' }).getByLabel('Toggle Todo').uncheck();
  await page.getByRole('listitem').filter({ hasText: 'Do samples' }).getByLabel('Toggle Todo').uncheck();
 await page.getByText('Mark all as complete').click();
});