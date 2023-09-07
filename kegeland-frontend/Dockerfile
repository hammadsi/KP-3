FROM node:14.17.1

WORKDIR /app

COPY . .

RUN npm install --force

RUN npm run lint

ENV REACT_APP_API_URL "https://tdt4290-api.herokuapp.com"

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD [ "npx", "serve", "build" ]