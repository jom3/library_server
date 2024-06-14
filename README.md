# Library server
## Description
This project was made with:
- Nodejs
- TypeScript
- Express
- Nodemon
- Lodash
- Loggers
- Json Web Tokens
- Zod
- pg
- Postgresql
- Docker
- Administrador de paquetes PNPM
## Table of contents
- [Library server](#library-server)
  - [Description](#description)
  - [Table of contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Logging](#logging)

## Prerequisites

You need to install:
  - [Nodejs](https://nodejs.org/en)
  - [Pnpm](https://pnpm.io/es/installation)

You can choose one of them:
  - You can use [Docker](https://www.docker.com/)
  
  or

  - You can use [PostgreSQL](https://www.postgresql.org/)

You can also install:
  - [Table plus](https://tableplus.com/), It can help you to manage your database.

## Installation

  - Configure your environtments

    - There's an file called .env.template and you need to change the name to .env
    - Introduce the new data, all this data needs to be your own configuration.

  - Using docker:
    - docker use environtment data to access to the database

  `docker-compose up -d`

  or

  - Using postgreSQL:

    - You need to insert your own data in the file **.env** to start working

  - Run the queries from:

  [library server database](https://drive.google.com/file/d/1smLXocQgxhxM_gE05VO79OaGTkSuj585/view?usp=sharing)  

  - Clone the repository:

  `git clone https://github.com/jom3/library_server.git`

  - Install the dependencies

  `pnpm install or pnpm i`

  - Run the server

  `pnpm run start`

## Logging

The application uses a logger for logging purposes. You can configure the logging level and format in the configuration files.