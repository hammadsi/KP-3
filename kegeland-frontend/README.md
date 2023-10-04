[![CI](https://github.com/TDT4290-Gruppe-10/kegeland-frontend/actions/workflows/on-pull-request.yml/badge.svg)](https://github.com/TDT4290-Gruppe-10/kegeland-frontend/actions/workflows/on-pull-request.yml)
[![CD](https://github.com/TDT4290-Gruppe-10/kegeland-frontend/actions/workflows/on-push.yml/badge.svg)](https://github.com/TDT4290-Gruppe-10/kegeland-frontend/actions/workflows/on-push.yml)
[![codecov](https://codecov.io/gh/TDT4290-Gruppe-10/kegeland-frontend/branch/master/graph/badge.svg?token=PA8OQV3AWD)](https://codecov.io/gh/TDT4290-Gruppe-10/kegeland-frontend)

# Description

This repository is a part of a delivery in the course [TDT4290 costumer driven project](https://www.ntnu.no/studier/emner/TDT4290/2017/1#tab=omEmnet) at NTNU.

Here, you will find the code for the Web application part of the project, which in general is a SPA dashboard application intended for physicians to be able to monitor their patients exercises.

The intention behind this service is to prove the concept of vieview exercise data when trained by patients. This repository depends on the [API](https://github.com/TDT4290-Gruppe-10/kegeland-api) to run properly. Also related to this project is [a mobile game](https://github.com/TDT4290-Gruppe-10/kegeland-app) where patients can exercise, using a sensor.

The project is build on the [React](https://reactjs.org/) framework - a Javascript library to build user interfaces. It is, however, written with [Typescript](https://www.typescriptlang.org/)

# Overall structure

This application was initialized using the [`create-react-app`](https://create-react-app.dev/docs/getting-started/) script.
As such the structure of this code is as follows:

```{r}
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   ├── ...
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── pages
│   │   ├── ExercisePage.tsx
│   │   ├── NotFound.tsx
│   │   ├── PatientListPage.tsx
│   │   ├── PatientPage.tsx
│   │   └── auth
│   │       ├── LoginPage.tsx
│   │       └── RegisterPage.tsx
│   ├── components
│   │   ├── DataTable.tsx
│   │   ├── ...
│   │   └── WeeklySessionsChart.tsx
│   ├── state
│   │   ├── ducks
│   │   │   ├── auth
│   │   │   │   ├── auth.actions.ts
│   │   │   │   ├── auth.helpers.ts
│   │   │   │   ├── auth.interface.ts
│   │   │   │   └── auth.reducer.ts
│   │   │   ├── patients
│   │   │   │   └── ...
│   │   │   ├── questionnaires
│   │   │   │   └── ...
│   │   │   ├── sensors
│   │   │   │   └── ...
│   │   │   ├── sessions
│   │   │   │   └── ...
│   │   │   └── settings
│   │   │       ├── settings.interface.ts
│   │   │       └── settings.reducer.ts
│   │   └── store.ts
│   └── utils
│   │   ├── apiCaller.ts
│   │   ├── ...
│   │   └── tunk.utiles.ts
│   ├── constants
│   │   └── ...
│   ├── hoc
│   │   └── ...
│   ├── hooks
│   │   └── ...
│   ├── index.module.scss
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── routes
│   │   └── index.tsx
│   ├── styles
│   │   └── reset.css
│   ├── types.ts
├── tsconfig.json
└── yarn.lock

```

The important elements of this structure is that `App.tsx` reders the routes defined in the `routes/index.tsx` file, where the program defines paths for the pages of the web application and decides which `pages`-component to render. Wihin a page, user interface is defined and utilzes often used components like buttons or similar from the `components` directory.

Many pages will also use the custom hooks developed to retrieve data relevant for its usage. This implementation can be found in the `state` directory, which in turn uses the prgrams implementation of [Redux](https://react-redux.js.org/). These will also use some functions from the `utils` directory, where standard and reusable functions are defined.

Example usage of hooks:

```
import usePatientList from '../hooks/usePatientList';

const PatientListPage: React.FC = () => {
  const { patients, loading, filterData } = usePatientList();
  // patients is now a variable with list of all the patients in the system
  return (
    <>
      {/*React Code*/}
    </>
   )
  }
```

## Development view - Example use case

<img src="public\readmeImages\webProcessView.drawio.svg" >
# Getting started

In order to test, run or develop on the project, one must perform the following steps:

## 1. Prerequisites

1. Download and install [`node`](https://nodejs.org/en/download/)
2. Install [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) using `npm install --global yarn`
3. Clone, install and run the [API](https://github.com/TDT4290-Gruppe-10/kegeland-api) for this project
4. Clone this project. `git clone https://github.com/TDT4290-Gruppe-10/kegeland-api.git`

## 2. Runing the code

1. cd into the folder of this project from a terminal
2. run `yarn install`
3. once everyting is installed, you can run `yarn start` to spin up a development server on your local machine

## 4. Testing

run `yarn test` to run the tests developed for this repository.

## 5. Formatting

Before committing, format your files using alt+shift+F (Windows) or cmd+shift+F (Mac)
To successfully install prettier, navigate to the directory `KP-3/kegeland-frontend` and execute the followig command

```
yarn add --dev --exact prettier
```

When prettier errors occurr, run the commands

```
yarn prettier . --write

yarn prettier --write "src/**/*.{js,jsx,ts,tsx}"
```

from the directory `KP-3/kegeland-frontend`
