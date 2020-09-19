
const axios = require("axios");
const convert = require('json-2-csv')
const fs = require('fs');
require('dotenv').config()

const getNewarrivals = async(page,country)=>{
   return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //let result = ['a','b','c']
        axios({
            "method":"GET",
            "url":"https://ott-details.p.rapidapi.com/getnew",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"ott-details.p.rapidapi.com",
            "x-rapidapi-key":process.env.API_KEY,
            "useQueryString":true
            },"params":{
            "page":page,
            "region":country
            }
            })
            .then((response)=>{
            //  console.log(response.data)
               resolve(response.data.results)
            })
            .catch((error)=>{
              console.log(error)
            }) 
        //resolve(result)
    },page*1000)
     
   })
}
 async function getAllNewArrivals ()
{
    
   // result = await getNewarrivals(page)
   // console.log(result)
   const jsontocsv =(result) =>{
    let data = result.map(result=>{
         
        let platforms = result.streamingAvailability.country[Object.keys(result.streamingAvailability.country)[0]]
        let arr = platforms.map(e=>{

            let obj = {
                IMDB_ID : result.imdbid,
                Title : result.title,
                Type : result.type,
                Language : result.language.toString(),
                ReleaseYear : result.released,
                Country : Object.keys(result.streamingAvailability.country)[0], 
                Platform : e.platform,
                Watchlink : e.url
            }
            return obj;
        })
       // console.log(arr)
       /*  convert.json2csv(arr ,(err,csv)=>{
            console.log(csv)
            let stream  = fs.createWriteStream('newarrivals.csv',{flags :'a'})
            stream.write(csv)
        }) */
        return arr;
        
    })
   // console.log(data.length)
    data = data.flat(1)
   // console.log(data.length)
    convert.json2csv(data ,(err,csv)=>{
        console.log('writting data to csv...')
        csv = csv.split('\n')
        csv.splice(0,1)
        csv = csv.join('\n')
      //  console.log(csv)
        let stream  = fs.createWriteStream('newarrivals.csv',{flags :'a'})
        stream.write(csv)
        
    })
   }
   let result = []
    let country = ['IN','US']
    let count = 1;
   for(let i=0; i<country.length ; i++)
   {
    let page = 1;
   // count= count++
    do {
        result = await getNewarrivals(page,country[i])
    
        page = page+1;
       // console.log(result.length)
        jsontocsv(result)
    }
    while(result.length >1)
   }
  //console.log('data written to csv')
       
    
    
}
getAllNewArrivals()

