<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

Gift service API, 

Using repository pattern & Dependency Inversion Principle, so our code is flexible and maintainable, and testable.

Using ResponseDto for response consistency

setup logmiddleware and AllExceptionFilter to log all http requests and exceptions

using prisma for db migration and ORM.

Using DBML for ERD documentation.

using bcrypt for password hashing. 

using SnakeCaseInterceptor so response payload key always in snake_case

using swagger for standard openAPI, but the response model is not yet implemented.


### Deployment

Using AWS ec2, nginx proxy manager for domain pointing, 
run with docker compose, add EC2 security group to allow app port from nginx proxy CIDR.

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

or use psql:
```bash
# install postgresql-client or postgresql-client-16 first
$ psql -U <dbuser> -h <host> <dbname> < ./docs/db_schema.sql
```

if you use vscode, you can easily run with devcontainer just by installing devcontainer extension.
open command palette > choose `Dev Containers: Rebuild Container`

copy `.env.example` to `.env` and adjust the value as you need.

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


# db migrate
$ npm run migrate

# create user first for mutating data
# all gift api guarded by jwt bearer token, except read api
$ curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "maria",
    "password": "guess",
    "email" : "maria@guess.com",
    "name": "maria"
}'
# next, see postman doc
```

## Run with Docker
```
$ docker compose up
# or
$ docker compose up -d
```

## Testing
```
npm run test
```

## Postman
[postman-collection.json](./docs/RollingGlorry.postman_collection.json)  

## Swagger
when you run the app, it will server swagger page on `http://localhost:3000/api`

## ERD
[erd.dbml](./docs/erd.dbml)

![ERD](./docs/ERD.png "ERD")