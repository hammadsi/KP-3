FROM node:14.17.1

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

COPY . .

RUN yarn build

RUN yarn compodoc

CMD ["node", "dist/main.js"]