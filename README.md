# Get regular BULK movie/show OTT data in CSV 
Get movies and shows information for over 150+ OTT/ Streaming Platforms from rapidapi. Nicely format new arrivals into csv 

1. Saves new movie/show arrivals into a csv file
2. Can be run daily to append the csv file with new arrivals of the day

## Running the script : 
1. Clone the repo in your local directory, check https://docs.github.com/en/enterprise/2.13/user/articles/cloning-a-repository. for instructions on how to clone .
2. Edit the file .env file and update with your `API_KEY = 'Your apikey from rapidapi'`.
3. Install dependencies using `npm install` or `yarn` from the root directory in terminal.
4. Run `node script.js` to generate a csv file with new arrivals data.

## More
- This project uses the API from Rapid API here - https://rapidapi.com/gox-ai-gox-ai-default/api/ott-details
- You get all the 150+ OTT platforms and Millions of movies listed in https://flixcatalog.com
