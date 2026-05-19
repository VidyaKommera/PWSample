import{test,expect} from '@playwright/test'
test.describe('Drop downTests', ()=>{
    test.beforeEach(async({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/')
    })

    test.only('single slect dropdown test',{tag: '@SmokeTest'},async({page})=>{
        const singSel=page.locator('#country')
        singSel.scrollIntoViewIfNeeded()
        await singSel.selectOption({index:9})
        await page.waitForTimeout(2000)
        expect(await singSel.inputValue()).toBe('india')


        //using callback and checking the options

        await page.selectOption('#country',{label:'Germany'}).then((dropdownValue)=>{
            expect(dropdownValue).toEqual(['germany'])
        })
    })

 test('Multi slect dropdown test',async({page})=>{
const mulsel = page.locator('#animals')
mulsel.scrollIntoViewIfNeeded()
await mulsel.selectOption(
    [{label:'Cheetah'},
        {index:4},
        {value:'lion'}
    ])
    await page.waitForTimeout(2000)
 })
})