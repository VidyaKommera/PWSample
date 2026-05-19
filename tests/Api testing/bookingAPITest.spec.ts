import{test,expect} from '@playwright/test'
test.describe('API Testing-CRUD Methods',()=>{
   
  //let baseURl=' https://restful-booker.herokuapp.com/' 
  test('Fetch all bookings',async({request})=>{
      const response=await request.get('/booking')
      const resStatus= response.status()
      console.log(resStatus)
      expect (response.status()).toBe(200)
      expect(response.ok()).toBeTruthy()
      const headers = response.headers()
      console.log('Headers.....',headers['content-type'])
      expect(headers['content-type']).toEqual('application/json; charset=utf-8')
      const jsonData= await response.json()
      console.log('Json data list...', jsonData)

  }
)

test('Fetch a booking details',async({request})=>{

  const response=await request.get('/booking/81')
  const resStatus= response.status()
  console.log(resStatus)
  expect (response.status()).toBe(200)
  const jsonData= await response.json()
  console.log('Json data list...', jsonData)
   expect(jsonData.firstname).toBe('Jane')
   expect(jsonData.bookingdates.checkin).toBe('2018-01-01')

})

 test('Generate token', async({request})=>{
  let strToken:string
    const response= await request.post('/auth',{
      headers:{
        'Content-Type': 'application/json'
      },
      data:{
        "username":"admin",
        "password":"password123"
      }
    })
const resStatus= response.status()
const jsonData= await response.json()
console.log(" Token..",jsonData.token)
strToken = jsonData.token
const delResponse = await request.delete('/booking/81',{
  headers:{
    'Content-Type': 'application/json',
    'Cookie': `token=${strToken}`
    
  }
}) 
console.log(delResponse.status())
 })


test('Fetch all users',async({request})=>{
  const response= await request.get('https://reqres.in/api/users/4',
    {
      headers:{
        'x-api-key' : 'reqres_e935237c065d40f384fcc759eb86b888'
      }
    }
  )
  const resStatus= response.status()
  console.log(resStatus)
  console.log(await response.json())
})
})