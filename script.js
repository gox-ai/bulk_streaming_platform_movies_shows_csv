
const axios = require("axios");
const convert = require('json-2-csv')
const fs = require('fs');
require('dotenv').config()
const JFile = require('jfile')
let stream = fs.createWriteStream('newarrivals.csv', { flags: 'a' })
       

const getNewarrivals = async (page, country) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //let result = ['a','b','c']
            axios({
                "method": "GET",
                "url": "https://ott-details.p.rapidapi.com/getnew",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "ott-details.p.rapidapi.com",
                    "x-rapidapi-key": process.env.API_KEY,
                    "useQueryString": true
                }, "params": {
                    "page": page,
                    "region": country
                }
            })
                .then((response) => {
                    //  console.log(response.data)
                    resolve(response.data.results)
                })
                .catch((error) => {
                    console.log(error)
                })
            //resolve(result)
        }, page * 1500)

    })
}
async function getAllNewArrivals() {

    // result = await getNewarrivals(page)
    // console.log(result)
    const formatdata = (result) => {
        let data = result.map(result => {

            let platforms = result.streamingAvailability.country[Object.keys(result.streamingAvailability.country)[0]]
            let arr = platforms.map(e => {


                // console.log(r)
                let obj = {
                    IMDB_ID: result.imdbid,
                    Title: result.title,
                    Type: result.type,
                    Language: result.language.toString(),
                    ReleaseYear: result.released,
                    Country: Object.keys(result.streamingAvailability.country)[0],
                    Platform: e.platform,
                    Watchlink: e.url,
                    //exists : r.length >0 ? 'Yes' : 'No'
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
        return data

        // console.log(data.length)


    }
                 
    let result = []
    let country = ['IN', 'US']
    let count = 1;
    for (let i = 0; i < country.length; i++) {
        let page = 1;
        // count= count++
        do {
            result = await getNewarrivals(page, country[i])

            page = page + 1;
            // console.log(result.length)
            let data = formatdata(result)

            for (let i = 1; i < data.length; i++) {   //console.log(data[i])
                // let d = data[i]+ '\n'
                setTimeout(() => {
                  let file = new JFile('newarrivals.csv')
                    let found = file.grep(data[i].IMDB_ID)

                    let arr = [data[i]]

                    convert.json2csv(arr, (err, csv) => {
                        console.log('writting data to csv...')
                        // console.log(csv)
                        csv = csv.split('\n')
                        csv.splice(0, 1)
                        csv = csv.join('\n')
                        if (found.length > 0) {
                            csv = 'Yes ,' + csv
                        }
                        else {
                            csv = ' ,' + csv
                        }
                        csv = csv + '\n'
                       
                        stream.write(csv)

                    })

                }, i * 100)


            }
        }
        while (result.length > 1)
    }
    //console.log('data written to csv')



}
getAllNewArrivals()

