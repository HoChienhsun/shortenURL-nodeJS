## Set up

1. Type `npm install`.
2. Create the environment, including mysql database and set the configuration.
3. In config folder, you can set up your dev variable.


## Create a shortenURL table and insert data or fetch the data

1. create the table from the sql query in the folder named database.
2. you will see the row and column like below after inserting the data.

| PK  | url | uuid | 
| --- | -------- | ---- | 
| 1   | https://github.com/satori/go.uuid   | 4a7af373-fb12-48a9-9351-3096b29646e1| 

## start server

1. execute `NODE_ENV=dev node ./server.js` 
2. open brower and go to `http://localhost:3000/`
