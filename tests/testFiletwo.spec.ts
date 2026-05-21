import {test, expect} from '@playwright/test'
 test('Assertions test.....',{tag: '@SmokeTest'}, async({page})=>{
const val=10
expect(val).toBeGreaterThan(5)
console.log("Phase2 push")
 })