# NC News Application

This repo contains all of the information, data and functions needed to run, seed and host the [Northcoders News Site](https://northcoders-news-yo3k.onrender.com/api). A site dedicated to all of the insights and thoughts of staff and students working and studying in Northcoders!

In this repo you will find all of the currently supported api endpoints, the controller functions they're invoking and the model functions required to query and interact with the database. There is also functionality for error handling that will both inform the users of any errors they have made and prevent SQL injection from being executed.



## Setting up the Project

### Minimum Version Requirements

Please make sure your versions of Node and PostgreSQL are running at a minimum of:
- Node.js: 11.0.0
- PostgreSQL: 16.6

Once you have confirmed you are running the correct versions of Node.js and PostgreSQL, choose the folder you would like to install this project into and type this into the command line:

```
git clone https://github.com/slick-coding/nc-news-app.git
```

### Setting up your .env files

Before anything else, you need to create three .env files in the main folder. Create a file called: `.env.development` and paste this text into the first line and save it:

```
PGDATABASE=nc_news
```

Next, create a file called: `.env.test` and paste this text into the first line and save it:

```
PGDATABASE=nc_news_test
```
Finally you want to create a file called `.env.production` and paste this code into it. However if you're running it locally and don't want to interact with the online database or site, then you can omit this step:

```
DATABASE_URL='transactionPoolerLink'
PGDATABASE=nc_snacks
```

### Installing dependencies

Now that you have completed the previous steps you're ready to initialise the project. Start off by running the command `npm install`


If there are any issues with the installation, please verify that you have the minimum versions of these modules installed in `package.json`:
- Dev Dependencies
  - Husky: 8.0.2
  - Jest: 27.5.1
  - Jest-extended: 2.0.0
  - Jest-sorted: 1.0.15
  - Supertest": 7.0.0
- Dependencies
  - Dotenv: 16.4.7
  - Express: 4.21.2
  - pg: 8.13.3
  - pg-format: 1.0.4

### Seeding your Database

Now you're ready to seed your database, start by running the scripts `npm run setup-dbs`, followed by `npm run seed-dev` and finally `npm run test-seed`. If there are any errors after executing these commands please verify your .env files and run the scripts again. If for any reason you need to restart the process you can re-run the scripts in that order.

### Running Tests

Once you have fully seeded the test and production databases you can run tests. This can be done via the script `npm run test` to run Jest. If you encounter any failed tests, start by running the test script again to make sure it's not a one-time issue with the high-quantity asynchronous tests. Testing of specific test files can be achieved with the command `npm test 'test.file.name.js'`.

#### With that you are ready to modify the codebase, test further functionality and make further queries to the Database!