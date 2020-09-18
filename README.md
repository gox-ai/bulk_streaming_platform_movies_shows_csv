# Get regular BULK movie OTT data into CSV 
Get movies and shows information for over 150+ OTT/ Streaming Platforms from rapidapi. Nicely format new arrivals into csv 

1. Saves new movie/show arrivals into a csv file
2. Can be run daily to append the csv file with new arrivals of the day

## Running the script : 
1. Clone the repo in your local directory, check https://docs.github.com/en/enterprise/2.13/user/articles/cloning-a-repository. for instructions on how to clone .
2. Edit the file .env file and update with your `API_KEY = 'Your apikey from rapidapi'`.
3. Install dependencies using `npm install` or `yarn` from the root directory in terminal.
4. Run `node script.js` to generate a csv file with new arrivals data.
