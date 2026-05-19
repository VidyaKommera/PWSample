import{test,expect} from '@playwright/test'
test.describe('Screenshot Tests', ()=>{
    test.beforeEach(async({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/')
    })
test('SampleScreeshot Test',async({page})=>{
    await page.screenshot({path:'./screenshots/fullpage.png', fullPage:true})
    await page.screenshot({path:'./screenshots/fullpage.png'})
    await page.locator('#colors').screenshot({ path: './screenshots/element.png'})
})
})