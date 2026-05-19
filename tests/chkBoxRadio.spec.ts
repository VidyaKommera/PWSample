import{test,expect} from '@playwright/test'
test.use({
    screenshot:'on',
    trace:'off'
})
test.describe.only('checkbox and Radio Button Tests', ()=>{
    //test.describe.configure({retries:2})
    test.beforeEach(async({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/')
    })
    test.fail('Checkbox Test',{
  annotation: {
    type: 'issue',
    description: 'Have falky tests want to retry',
  },
},  async({page})=>{
        await page.getByRole('checkbox',{name:'Sunday'}).check()
        const mondayCheckbox= page.getByRole('checkbox', {name:'Monday1'})
        await mondayCheckbox.check()
        await page.getByRole('checkbox',{name:'Tuesday'}).check()
        await expect(mondayCheckbox).toBeChecked()
        await mondayCheckbox.uncheck()
        await expect(mondayCheckbox).not.toBeChecked()
    })

    //test.skip('radio Button Test', async({page})=>{
        test('radio Button Test', async({page})=>{
       // test.slow()
        const gender=page.getByLabel('Male', {exact:true})
        await expect(gender).not.toBeChecked()
        await gender.check()
        await expect(gender).toBeChecked()
    })
})