# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demoblaze.spec.ts >> CheckOut Order >> Delete from cart
- Location: tests\demoblaze.spec.ts:29:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('#tbodyid tr')
Expected: 2
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('#tbodyid tr')
    9 × locator resolved to 0 elements
      - unexpected value "0"

```

```
Error: locator.click: Test ended.
Call log:
  - waiting for locator('#tbodyid tr').filter({ hasText: 'Nexus' }).getByText('Delete')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - text:             
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "PRODUCT STORE" [ref=e4] [cursor=pointer]:
        - /url: index.html
        - img [ref=e5]
        - text: PRODUCT STORE
      - list [ref=e7]:
        - listitem [ref=e8]:
          - link "Home (current)" [ref=e9] [cursor=pointer]:
            - /url: index.html
            - text: Home
            - generic [ref=e10]: (current)
        - listitem [ref=e11]:
          - link "Contact" [ref=e12] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e13]:
          - link "About us" [ref=e14] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e15]:
          - link "Cart" [ref=e16] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e17]:
          - link "Log in" [ref=e18] [cursor=pointer]:
            - /url: "#"
        - listitem
        - listitem
        - listitem [ref=e19]:
          - link "Sign up" [ref=e20] [cursor=pointer]:
            - /url: "#"
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "Products" [level=2] [ref=e24]
      - table [ref=e26]:
        - rowgroup [ref=e27]:
          - row "Pic Title Price x" [ref=e28]:
            - columnheader "Pic" [ref=e29]
            - columnheader "Title" [ref=e30]
            - columnheader "Price" [ref=e31]
            - columnheader "x" [ref=e32]
        - rowgroup
    - generic [ref=e33]:
      - heading "Total" [level=2] [ref=e34]
      - generic:
        - generic:
          - heading [level=3]
      - button "Place Order" [ref=e35]
  - generic [ref=e37]:
    - generic [ref=e40]:
      - heading "About Us" [level=4] [ref=e41]
      - paragraph [ref=e42]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e45]:
      - heading "Get in Touch" [level=4] [ref=e46]
      - paragraph [ref=e47]: "Address: 2390 El Camino Real"
      - paragraph [ref=e48]: "Phone: +440 123456"
      - paragraph [ref=e49]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e53]:
      - img [ref=e54]
      - text: PRODUCT STORE
  - contentinfo [ref=e55]:
    - paragraph [ref=e56]: Copyright © Product Store
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | import {products} from '../testdata/data.json'
  3  | 
  4  | test.describe('CheckOut Order', ()=>{
  5  | 
  6  | test.beforeEach('Login', async({page})=> {
  7  | await page.goto('https://demoblaze.com/');
  8  | 
  9  | })
  10 |   
  11 | products.forEach((product,index)=>{
  12 | test(`ADD product ${product.name} to cart`, async({page})=> {
  13 | // await page.goto('https://demoblaze.com/');
  14 | await page.getByRole('link', { name: product.name}).click();
  15 | await page.getByRole('link', { name: 'Add to cart' }).click();
  16 | page.on('dialog',async dialog=>{
  17 |   console.log(dialog.message());
  18 |   await dialog.accept();
  19 | })
  20 | await page.getByRole('link', { name: 'Cart', exact: true }).click();
  21 | await expect(page.getByRole('cell', { name: product.name })).toBeVisible();
  22 | await page.getByRole('link', { name: 'Home (current)' }).click();
  23 | 
  24 | 
  25 | })
  26 | })
  27 | 
  28 |   
  29 | test('Delete from cart', async({page})=> {
  30 |   await page.getByRole('link', { name: 'Cart', exact: true }).click();
  31 |   const sel = page.locator(('#tbodyid tr')).filter({hasText: `${products[2].name}`})
> 32 |   sel.getByText('Delete').click()
     |                           ^ Error: locator.click: Test ended.
  33 |   await page.waitForTimeout(15000)
  34 |   await expect(page.locator('#tbodyid tr')).toHaveCount(2)
  35 | 
  36 | 
  37 | })
  38 |  
  39 | test('Place order and confirm', async({page})=> {
  40 | 
  41 | 
  42 | await page.getByRole('link', { name: 'Cart', exact: true }).click();
  43 | await page.getByRole('button', { name: 'Place Order' }).click();
  44 | 
  45 | await page.locator('#name').fill('vidyasree');
  46 | await page.locator('#country').fill('India');
  47 | await page.locator('#city').fill('hyderabad');
  48 | await page.locator('#card').fill('456');
  49 | await page.locator('#month').fill('may');
  50 | await page.locator('#year').fill('2026');
  51 | await page.getByRole('button', { name: 'Purchase' }).click();
  52 | await expect(page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
  53 | })
  54 | })
  55 | 
  56 | 
```