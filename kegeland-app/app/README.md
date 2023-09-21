# Application

## Folder structure

- `assets`: Asset folder to store all images, vectors, fonts, etc.
- `src`: This folder is the main container of all the code inside the application
  - `components`: Folder to store dumb components, i.e. components with minimal logic
  - `constants`: Folder to store any kind of constant that the project relies on
  - `containers`: Folder to store smart components, i.e. components with logic
  - `hooks`: Folder to store custom React-hooks
  - `routes`: Folder to store the navigators
  - `state`: This folder should have all the reducers and store
  - `utils`: Folder to store any common function such as calcutate radius, different date formatting functions
  - `views`: Folder that contains all your application screens/features
- `App.tsx`: Main component that starts the whole app.
- `index.js`: Entry point of the application as per React-Native standards.
