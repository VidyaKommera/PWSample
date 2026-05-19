import {test, expect} from '@playwright/test';
test.beforeEach(async({page})=> {
await page.goto('https://demoblaze.com/');

})
test('Logout', async({page})=> {

await page.getByRole('link', { name: 'Log out' }).click();
await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
await page.waitForTimeout(5000)
}
)

