# NodeJS RESTful API Microservice Starter v1.1.0
This repository contains a full configuration that runs NodeJS RESTful API Microservice Starter.

[![Build Status](https://secure.travis-ci.org/Abdizriel/nodejs-microservice-starter.png?branch=master)](https://travis-ci.org/Abdizriel/nodejs-microservice-starter)
[![Coverage Status](https://coveralls.io/repos/github/Abdizriel/nodejs-microservice-starter/badge.svg?branch=master)](https://coveralls.io/github/Abdizriel/nodejs-microservice-starter?branch=master)
[![Dependency Status](https://img.shields.io/david/Abdizriel/nodejs-microservice-starter.svg)](https://david-dm.org/Abdizriel/nodejs-microservice-starter)
[![Dev-Dependency Status](https://img.shields.io/david/dev/Abdizriel/nodejs-microservice-starter.svg)](https://david-dm.org/Abdizriel/nodejs-microservice-starter#info=devDependencies)

## Requirements

* [MongoDB](https://www.mongodb.com/download-center "MongoDB")
* [NodeJS](https://nodejs.org/en/download "NodeJS")

## Build for local development

You have to use the following command to start a development server:

```sh
npm run dev
```

See `package.json` for more details.

## Build for staging and production environments

Use following command to build project:

```sh
npm run build
```

Use following command to start project on staging and production environments:

```sh
npm start
```

See `package.json` for more details.

## Tests

Following tests libraries are used for unit/integration tests:
* [MochaJS](https://mochajs.org "MochaJS")
* [SinonJS](http://sinonjs.org "SinonJS")
* [ChaiJS](http://chaijs.com/ "ChaiJS")

Tests are kept next to source with following pattern *.spec.js

Use following command to run tests:

```sh
npm test
```

Use following command to run tests coverage:

```sh
npm run coverage
```

## Docker container

There is available Docker container and Docker Composer if you would like to run many NodeJS Microservices.

Build API Microservice by using following command:

```sh
npm run build
```

Then use following command to build Docker containers:

```sh
docker-compose up -d --build
```

See `Dockerfile` and `docker-compose.yml` for more details.

## Deployment

### Heroku

* Build Microservice by using following command `npm run build`
* Go to builded directory *dist*
* Download and install [Heroku Toolbelt](https://toolbelt.heroku.com/ "Heroku Toolbelt")
* Log in to Heroku by using following command `heroku login`
* Run following command `heroku create`
* Run following command `heroku addons:create mongolab` to add MongoDB to your application.
* Run following command `git push heroku master` to push your application to Heroku.

## TODO

* [#2](https://github.com/Abdizriel/nodejs-microservice-starter/issues/2) API Authentication oAuth2
* [#3](https://github.com/Abdizriel/nodejs-microservice-starter/issues/3) Waterline ORM
* [#5](https://github.com/Abdizriel/nodejs-microservice-starter/issues/5) 100% Test Coverage
