import { test, expect } from '@playwright/test';
test.use{viewport: {width:1100, height:800}}
test('Visual test', async({page})=>{
    await page.goto('https://www.example.com');
    await expect(page).toHaveScreenshot();

})