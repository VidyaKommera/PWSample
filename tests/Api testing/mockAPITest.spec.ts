import{test,expect} from '@playwright/test'
test.describe('API mock testing',()=>{
test('Mock tag list-replace tags',async({page})=>
{
    await page.route('https://conduit-realworld-example-app.fly.dev/api/tags', async route=>{
        const json={
            'tags':['playwright','Mock API']
        }
        route.fulfill({json})
    })
    await page.goto('https://conduit-realworld-example-app.fly.dev/')
    await page.waitForTimeout(3000)
    await expect (page.getByRole('button',{name:'playwright'})).toBeVisible()
})

test('Mock tag list-append new tags',async({page})=>{
    //mock tags at network layer
    await page.route('https://conduit-realworld-example-app.fly.dev/api/tags', async route=>{
        const response= await route.fetch()
        const json= await response.json()
        console.log(json)
        json.tags.unshift('playwright')
        await route.fulfill({response,json})
    })
    await page.goto('https://conduit-realworld-example-app.fly.dev/')
      await page.waitForTimeout(3000)
      await expect (page.getByRole('button',{name:'playwright'})).toBeVisible()
})
test('Record the HAR file',async({page})=>{
    //mocks tags at network layer
    
    await page.routeFromHAR('././har/tags.har',{
        url:'https://conduit-realworld-example-app.fly.dev/api/tags',
        update:true
    })
    await page.goto('https://conduit-realworld-example-app.fly.dev/')
})

//playwrightMockAPI
test.only('Read the HAR file',async({page})=>{
   await page.routeFromHAR('././har/tags.har',{
        url:'https://conduit-realworld-example-app.fly.dev/api/tags',
        update:false
    })

    await page.goto('https://conduit-realworld-example-app.fly.dev/')
     await page.waitForTimeout(3000)
      await expect (page.getByRole('button',{name:'playwrightMockAPI'})).toBeVisible()
})

})