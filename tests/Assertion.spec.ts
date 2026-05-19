import {test, expect} from '@playwright/test'
 test('Assertions test.....',{tag: '@SmokeTest'}, async({page})=>{
const val=10
expect(val).toBeGreaterThan(5)

await page.goto('https://testautomationpractice.blogspot.com/')
await expect(page).toHaveURL(/blogspot/)
await expect(page).toHaveTitle(/Testing/)
await expect(page).not.toHaveTitle(/playwright/)

const pageHeading= page.locator('h1')
await expect (pageHeading).toBeVisible()

await expect(page.locator('h6')).toBeVisible()
//If if fails , will not execute remaining steps
//to continue using soft assertion

//await expect.soft(page.locator('h6')).toBeVisible()

console.log('Page header text: ', await pageHeading.textContent())
await expect (pageHeading).toContainText('Automation Testing Practice')

await expect(page.locator('h6')).not.toBeVisible()

 })