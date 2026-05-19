import {test, expect} from '@playwright/test';
import {products} from '../testdata/data.json'

test.describe('Add and delete cart', ()=>{

test.beforeEach('Login', async({page})=> {
await page.goto('https://demoblaze.com/');
await page.getByRole('link', { name: 'Log in' }).click();
await page.locator('#loginusername').fill('vidyasree');
await page.locator('#loginpassword').fill('vidya');
await page.getByRole('button', { name: 'Log in' }).click();
await expect(page.getByRole('link', { name: 'Welcome vidyasree' })).toBeVisible();
})
  
products.forEach((product,index)=>{
test(`ADD product ${product.name} to cart`, async({page})=> {
// await page.goto('https://demoblaze.com/');
await page.getByRole('link', { name: product.name}).click();
await page.getByRole('link', { name: 'Add to cart' }).click();
page.on('dialog',async dialog=>{
  console.log(dialog.message());
  await dialog.accept();
})
await page.getByRole('link', { name: 'Cart', exact: true }).click();
await expect(page.getByRole('cell', { name: product.name })).toBeVisible();
await page.getByRole('link', { name: 'Home (current)' }).click();


})
})


  
test('Delete from cart', async({page})=> {
  //await page.locator() 
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  const sel = page.locator(('#tbodyid tr')).filter({hasText: `${products[2].name}`})
  sel.getByText('Delete').click()
  await expect(page.locator('#tbodyid tr')).toHaveCount(2)


})
 test('Place order and confirm', async({page})=> {


await page.getByRole('link', { name: 'Cart', exact: true }).click();
await page.getByRole('button', { name: 'Place Order' }).click();
await page.waitForTimeout(15000)
await page.locator('#name').fill('vidyasree');
await page.getByRole('textbox', { name: 'Country:' }).fill('India');
await page.getByRole('textbox', { name: 'City:' }).fill('hyderabad');
await page.getByRole('textbox', { name: 'Credit card:' }).fill('456');
await page.getByRole('textbox', { name: 'Month:' }).fill('may');
await page.getByRole('textbox', { name: 'Year:' }).fill('2026');
await page.getByRole('button', { name: 'Purchase' }).click();
await expect(page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
})




})

