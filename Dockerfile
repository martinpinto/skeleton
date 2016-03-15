FROM node:5.6.0-wheezy

RUN npm install

EXPOSE 3000

CMD npm start