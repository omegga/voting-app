FROM node:12
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run client:prod
CMD [ "npm", "start" ]
