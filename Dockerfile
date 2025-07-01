#development
FROM node:20-alpine AS develop

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 31009

CMD [ "npm", "start" ]

#production
FROM node:20-alpine AS production

WORKDIR /usr/prod/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=base /usr/src/app/dist ./dist
