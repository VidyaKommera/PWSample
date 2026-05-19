import {test as setup, expect} from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('Demoblaze Login', async({page})=> {
await page.goto('https://demoblaze.com/');
await page.getByRole('link', { name: 'Log in' }).click();
await page.locator('#loginusername').fill('vidyasree');
await page.locator('#loginpassword').fill('vidya');
await page.getByRole('button', { name: 'Log in' }).click();
await expect(page.getByRole('link', { name: 'Welcome vidyasree' })).toBeVisible();
await page.context().storageState({path: STORAGE_STATE})
})