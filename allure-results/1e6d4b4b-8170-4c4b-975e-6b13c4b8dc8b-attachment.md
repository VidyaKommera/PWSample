# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: exercise2.spec.ts >> Add and delete cart >> Delete from cart
- Location: tests\exercise2.spec.ts:34:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('#tbodyid tr')
Expected: 2
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('#tbodyid tr')
    5 × locator resolved to 0 elements
      - unexpected value "0"
    - locator resolved to 3 elements
    - unexpected value "3"
    - locator resolved to 0 elements
    - unexpected value "0"
    - locator resolved to 1 element
    - unexpected value "1"

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
        - listitem
        - listitem [ref=e17]:
          - link "Log out" [ref=e18] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e19]:
          - link "Welcome vidyasree" [ref=e20] [cursor=pointer]:
            - /url: "#"
        - listitem
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
        - rowgroup [ref=e33]:
          - row "Nokia lumia 1520 820 Delete" [ref=e34]:
            - cell [ref=e35]:
              - img [ref=e36]
            - cell "Nokia lumia 1520" [ref=e37]
            - cell "820" [ref=e38]
            - cell "Delete" [ref=e39]:
              - link "Delete" [ref=e40] [cursor=pointer]:
                - /url: "#"
    - generic [ref=e41]:
      - heading "Total" [level=2] [ref=e42]
      - heading "820" [level=3] [ref=e45]
      - button "Place Order" [ref=e46]
  - generic [ref=e48]:
    - generic [ref=e51]:
      - heading "About Us" [level=4] [ref=e52]
      - paragraph [ref=e53]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e56]:
      - heading "Get in Touch" [level=4] [ref=e57]
      - paragraph [ref=e58]: "Address: 2390 El Camino Real"
      - paragraph [ref=e59]: "Phone: +440 123456"
      - paragraph [ref=e60]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e64]:
      - img [ref=e65]
      - text: PRODUCT STORE
  - contentinfo [ref=e66]:
    - paragraph [ref=e67]: Copyright © Product Store
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | import {products} from '../testdata/data.json'
  3  | 
  4  | test.describe('Add and delete cart', ()=>{
  5  | 
  6  | test.beforeEach('Login', async({page})=> {
  7  | await page.goto('https://demoblaze.com/');
  8  | await page.getByRole('link', { name: 'Log in' }).click();
  9  | await page.locator('#loginusername').fill('vidyasree');
  10 | await page.locator('#loginpassword').fill('vidya');
  11 | await page.getByRole('button', { name: 'Log in' }).click();
  12 | await expect(page.getByRole('link', { name: 'Welcome vidyasree' })).toBeVisible();
  13 | })
  14 |   
  15 | products.forEach((product,index)=>{
  16 | test(`ADD product ${product.name} to cart`, async({page})=> {
  17 | // await page.goto('https://demoblaze.com/');
  18 | await page.getByRole('link', { name: product.name}).click();
  19 | await page.getByRole('link', { name: 'Add to cart' }).click();
  20 | page.on('dialog',async dialog=>{
  21 |   console.log(dialog.message());
  22 |   await dialog.accept();
  23 | })
  24 | await page.getByRole('link', { name: 'Cart', exact: true }).click();
  25 | await expect(page.getByRole('cell', { name: product.name })).toBeVisible();
  26 | await page.getByRole('link', { name: 'Home (current)' }).click();
  27 | 
  28 | 
  29 | })
  30 | })
  31 | 
  32 | 
  33 |   
  34 | test('Delete from cart', async({page})=> {
  35 |   //await page.locator() 
  36 |   await page.getByRole('link', { name: 'Cart', exact: true }).click();
  37 |   const sel = page.locator(('#tbodyid tr')).filter({hasText: `${products[2].name}`})
  38 |   sel.getByText('Delete').click()
> 39 |   await expect(page.locator('#tbodyid tr')).toHaveCount(2)
     |                                             ^ Error: expect(locator).toHaveCount(expected) failed
  40 | 
  41 | 
  42 | })
  43 |  test('Place order and confirm', async({page})=> {
  44 | 
  45 | 
  46 | await page.getByRole('link', { name: 'Cart', exact: true }).click();
  47 | await page.getByRole('button', { name: 'Place Order' }).click();
  48 | await page.waitForTimeout(15000)
  49 | await page.locator('#name').fill('vidyasree');
  50 | await page.getByRole('textbox', { name: 'Country:' }).fill('India');
  51 | await page.getByRole('textbox', { name: 'City:' }).fill('hyderabad');
  52 | await page.getByRole('textbox', { name: 'Credit card:' }).fill('456');
  53 | await page.getByRole('textbox', { name: 'Month:' }).fill('may');
  54 | await page.getByRole('textbox', { name: 'Year:' }).fill('2026');
  55 | await page.getByRole('button', { name: 'Purchase' }).click();
  56 | await expect(page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
  57 | })
  58 | 
  59 | 
  60 | 
  61 | 
  62 | })
  63 | 
  64 | 
```