import {test, expect} from '@playwright/test';

 test ('Sample locator test', async({page})=> {
    await page.goto('https://testautomationpractice.blogspot.com/');

   //const pwLink=  page.getByRole('link', { name: 'PlaywrightPractice' })
  //await pwLink.click()

  await page.getByRole('link', { name: 'PlaywrightPractice' }).click();
  await expect(page).toHaveTitle(/PlaywrightPractice/)
  const input = page.getByRole('textbox', { name: 'Username:' })
  await input.fill('TestUser')
  console.log(await input.inputValue())

  expect(await input.inputValue()).toBe('TestUser')
 
  await page.getByRole('button', { name: 'START' }).click()

//await page.getByText('START').click();
 const newBttn = page.getByRole('button', { name: 'STOP' })
 expect(await newBttn.textContent()).toBe('STOP')

 await page.getByLabel('Email Address:').fill('user1@gmail.com')
 await page.getByPlaceholder('Enter your full name').fill('TestUser') 

 const toolTipTxt = await page.getByTitle('Tooltip test').textContent()
 console.log('Tooltip text: ',toolTipTxt)
 
})

test ('locators using filters', async ({page})=>{
    await page.goto('https://demoblaze.com/')
    await page.waitForTimeout(10000)
    const itemsLink = page.locator('.card-block a')
    const itemsCount = await itemsLink.count()
    expect(itemsCount).toBe(9)

    await expect(itemsLink).toHaveCount(9)
    console.log('Getting the text of all the items: ', await itemsLink.allInnerTexts())

    //Method1: to get all text and select an item
    //for(let i=0;i<itemsCount;i++)
// {
//     const itemText = await itemsLink.nth(i).textContent()
//     console.log('Item Text: ', itemText 
//         if (itemText?.trim()=='Samsung galaxy s6')
//         {
//             await itemsLink.nth(i).click()
//             break
//         }
//     )
// }
// await page.waitForTimeout(2000)
// Method2: To get all text and select an item 

// const texts = await itemsLink.evaluateAll(list=>
//     list.map(item=> item.textContent)
// )
// console.log('All Texts: ',texts)
// await itemsLink.nth(0).click()
// await pageXOffset.waitForTimeout(2000)

//Method3: using filter to select an item

await itemsLink.filter({hasText:'Samsung galaxy s6'}).click()
await page.waitForTimeout(2000)

await expect (page.getByRole('heading',{name:'Samsung galaxy s6'})).toBeVisible()
})