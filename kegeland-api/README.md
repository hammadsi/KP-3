[![CI](https://github.com/TDT4290-Gruppe-10/kegeland-api/actions/workflows/on-pull-request.yml/badge.svg)](https://github.com/TDT4290-Gruppe-10/kegeland-api/actions/workflows/on-pull-request.yml)
[![CD](https://github.com/TDT4290-Gruppe-10/kegeland-api/actions/workflows/on-push.yml/badge.svg)](https://github.com/TDT4290-Gruppe-10/kegeland-api/actions/workflows/on-push.yml)
[![codecov](https://codecov.io/gh/TDT4290-Gruppe-10/kegeland-api/branch/main/graph/badge.svg?token=WNR65GN461)](https://codecov.io/gh/TDT4290-Gruppe-10/kegeland-api)
![Website](https://img.shields.io/website?down_color=red&down_message=error&label=Heroku&logo=heroku&logoColor=orange&up_message=ok&url=https%3A%2F%2Ftdt4290-api.herokuapp.com%2Fapi%2Fhealth)
[![Swagger](https://img.shields.io/badge/-OpenAPI%20Docs-gray?logo=swagger)](https://tdt4290-api.herokuapp.com/api/docs)

> Documentation for the API structure can be found [here](https://tdt4290-api.herokuapp.com)

> Documentation for the API-endpoints can be found [here](https://tdt4290-api.herokuapp.com/api/docs)

# Description
This repository is a part of a delivery in the course [TDT4290 costumer driven project](https://www.ntnu.no/studier/emner/TDT4290/2017/1#tab=omEmnet) at NTNU. 

Here, you will find the code for the API part of the project, which in general this is a REST API based on `http` requests.

The intention behind this service is to structure data query and flow for the Kegeland project - a project owned by the departement of physiotherapy at NTNU. Related to this project is [a mobile game](https://github.com/TDT4290-Gruppe-10/kegeland-app) created for exercise and [a webapp](https://github.com/TDT4290-Gruppe-10/kegeland-frontend) created to manage patients.

The project is based on the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Overall structure
This API is a modularized structure, based on the Nestjs framework.
Each service has: 
- a `*.module.ts` that exports the module so that it can be consumed by the application
- a `*.controller.ts` that serves the endpoints (`get`, `post`, `put` and `delete` methods)
- a `*.service.ts` that delivers functions consumed by the controller. It directly queries the database (firebase) and appropriate logic.

In this API you can find the following services:
- `auth` a service for handling authentication of users. Inlcuding authenticating, creating and deleting users.
- `firebase` a service that handles the connection between the API and the database hosted in [firebase](https://firebase.google.com/)
- `questionnaires` a service that handles requests and queries regarding the Questionnaires entity in the database
- `sensors` a service that handles requests and queries regarding the Sensors entity in the database
- `sessions` a service that handles requests and queries regarding the Sessions entity in the database
- `users` a service that handles requests and queries regarding the Users entity in the database

In the root folder (`./src`) you will also find the following:
- `app.module.ts` imports all other modules and make their services availible for consumption in the API.
- `main.ts` initialises the application
- other util files including files for lint and package handling and other configuration files



# Getting started
When the repository is cloned on your local machine, rename `.env.example` to `.env`. Thereby, you will need credentials for a google service account and a firebase web app. 
> **_NOTE_**: The `env` values must be requested to simekri@stud.ntnu.no or find them attached in the project delivery

## 1. Configure service acccount

1. Go the dashboard for your firebase-project, and navigate to Project settings
2. Select the tab named **Service accounts**.
3. Make sure **Firebase Admin SDK** is selected, and press **Generate new private key**. This will download new credentials for a google service account.
4. Move the downloaded file to the root-directory of this project, and rename it to `firebase.config.json`.

## 2. Configure Firebase SDK

1. Go the dashboard for your firebase-project, and navigate to Project settings
2. In the tab **General**, scroll to the section called **Your apps**.
3. Select a _Web App_ and locate the code `const firebaseConfig = {...}`
4. Copy these values to their respective fields in the `.env`-file you created.
   > **_NOTE_**: Make sure you don't have quotation-marks around the values.

Follow the steps under [Installation](#installation) and [Running the app](#running-the-app).

Once the app is running you can navigate to `http://localhost:<SERVER_PORT>/api/docs` for OpenApi-documentation of the endpoints.

> **_NOTE_**: `SERVER_PORT` is the value specified in your `.env`-file.

## 3. Installation

```bash
$ yarn install
```

## 4. Running the app

```bash
# watch mode
$ yarn start:dev

# production mode
$ yarn start
```

## 5. Test
In this project we have develped two main types of tests:
1. Tests for controllers (can be found in `<modulename>.controller.spec.ts` in the modules `__tests__` directory)
   - Verifies that a call to an endpoint will trigger the correct service
2. Tests for services (can be found in `<modulename>.service.spec.ts` in the modules `__tests__` directory)
   - Verifies the logic of the service and its return values

### Mocking firebase
Due to this project relying on the firebase service, we have not had access to a test database, hence we have mocked the implementation of firebase. This can be found in `./src/__mocks__/firebaseMock` and please note that it has not been prioritized to spend much time on this - it will mock neccesary funtions to ensure that the services use the right logic, but is not intended to actually simulate a database like firebase.
> **_NOTE_**: Please read more about test strategy and coverage in the submitted report

### Running tests
```bash
# unit tests and e2e
$ yarn test

# test coverage
$ yarn test:cov
```

# Further development
This project has been developed with the idea in mind that it should be maintained and further developed by others. 
We encourage to continue implmenting the Nestjs framwork and its applications. 
> **_NOTE_**: Our report covers more details about further work

## Creating new module

Run the following command to create a new module:
```bash
$ nest generate <schematic> <name> [options]
```
You can read more about generating new modules in Nestjs [here](https://docs.nestjs.com/cli/usages#nest-generate)


