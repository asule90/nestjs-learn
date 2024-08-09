<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

Gift service API, 

### Features:
- create user
- login
- CRUD gift
- rate gift: will increate `gift.review_count` and calculate `gift.rating`
- redeem gift


## Preparation  
make sure you have postgresql database named `postgre`.  

if you have database desktop client 
just import `docs/db_schema.sql` file.  

or use pg_dump:
```bash
$ pg_dump -U <dbuser> -h <host> -d <dbname> < ./docs/db_schema.sql
```

if you use vscode, you can easily run with devcontainer just by installing devcontainer extension.

copy `.env.example` to `.env` and adjust the value as you need.

```bash
# db migrate
$ npm run migrate

# db seed
$ npx prisma db seed
# check ./prisma/seed/seed.ts
```

## Running the app

```bash
# development
$ npm install
# if you have problem with bcyprt:
$ npm install node-gyp 

$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Postman
[postman-collection.json](./docs/RollingGlorry.postman_collection.json)  

## Swagger
when you run the app, it will server swagger page on `http://localhost:3000/api`

## ERD
[erd.dbml](./docs/erd.dbml)

![ERD](./docs/ERD.png "ERD")