import{test,expect} from '@playwright/test'
test.describe('Auto wait test....', ()=>
{

    test.beforeAll(async()=>{
        
   // test.setTimeout(60000)
    })

  
   test('Auto Wait',async({page})=>{
 // test.setTimeout(60000)
  test.setTimeout(80000)
  
    await page.goto('http://uitestingplayground.com/ajax')
    await page.locator('#ajaxButton').click()
    const txtElem = page.locator('.bg-success')
   // const txtMsg = await txtElem.textContent()
    //console.log(txtMsg)
    // await expect(txtElem).toHaveText('Data loaded with AJAX get request.',{timeout;20000})
     expect( await txtElem.textContent()).toContain('Data loaded with AJAX get request.')
 //expect(txtMsg).toContain('Data loaded with AJAX get request.')
 //expect(txtMsg).toBe('Data loaded with AJAX get request.',{timeout;20000})

 await expect(txtElem).toHaveText('Data loaded with AJAX get request.')
 //await page.waitForTimeout(30000)

   })

   test('Waiting for network response',async({page})=>{
    test.setTimeout(25000)
      await page.goto('http://uitestingplayground.com')

       await page.getByRole('link',{ name:'Load Delay'}).click()
        // await page.waitForResponse('http://uitestingplayground.com/loaddelay')
   page.waitForLoadState('domcontentloaded')
  //waiting for particular response
   // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
   
     await page.getByRole('button').click()
      //wait for all network calls to complete
      //await page.waitForLoadState('networkidle')  //not recommended

   })

})