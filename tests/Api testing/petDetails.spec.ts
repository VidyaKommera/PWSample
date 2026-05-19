import{test,expect} from '@playwright/test'
import pet from '../../testdata/petdata.json'
import updatepet from'../../testdata/update pet.json'

test.describe('API Testing-pet',()=>{
   
  
  test('Fetch pet details',async({request})=>{
      const response=await request.get('https://petstore.swagger.io/v2/pet/548661')
     const resStatus= response.status()
     console.log(resStatus)
     expect (response.status()).toBe(200)
    const jsonData= await response.json()
    console.log('Json data list...', jsonData)
    expect(jsonData.category.name).toBe('kangs name')
    expect(jsonData.tags[0].name).toBe('kangs tag 548661')

  })

  test('Create a new pet store', async({request})=>{
    const response= await request.post('https://petstore.swagger.io/v2/pet',
        {headers:{
            'accept':'application/json',
            'Content-Type': 'application/json'
        },data: pet}) 
    console.log(response.status())
    await expect(response).toBeOK()
    const jsonData = await response.json()
    console.log(jsonData)
   expect(response.status()).toBe(200)
   expect(jsonData.name).toBe('Pet Store')
   expect(jsonData.tags[1].name).toBe('Golden Retriever')
   expect(jsonData).toHaveProperty('name','Pet Store')
   expect(jsonData.name).toContain('Pet Store')
    expect(jsonData.status).toContain('available')
  })


  test('Updatepet store', async({request})=>{
    const response= await request.put('https://petstore.swagger.io/v2/pet',
        {headers:{
            'accept':'application/json',
            'Content-Type': 'application/json'
        },data: updatepet}) 
    console.log(response.status())
    await expect(response).toBeOK()
    const jsonData = await response.json()
    console.log(jsonData)
   expect(response.status()).toBe(200)
   expect(jsonData.name).toBe('Pet Store')
//    expect(jsonData.tags[1].name).toBe('Golden Retriever')
   expect(jsonData).toHaveProperty('name','Pet Store')
   expect(jsonData.name).toContain('Pet Store')
    //expect(jsonData.status).toContain('available')
  })
  
})