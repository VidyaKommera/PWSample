import{test,expect} from '@playwright/test'
test.describe('Popup Window Tests', ()=>{
    test.beforeEach(async({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/')
    })

    test("new window test", async({page})=>{
        // method1:
        // const [newPage] = await Promise.all([
        //     page.waitForEvent('popup'),
        //     await page.getByRole('button', {name: 'New Tab'}).click()
        // ])
        // await newPage.waitForLoadState()
        // await expect(newPage).toHaveTitle(/SDET-QA/)
//Method2:
const poupPromise = page.waitForEvent('popup');
await page.getByRole('button',{name: 'New Tab'}).click()
const popup = await poupPromise;
await popup.waitForLoadState();
await expect(popup).toHaveTitle(/SDET-QA/)
    })

})