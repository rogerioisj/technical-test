FROM node:20.11.0-alpine

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

EXPOSE 3000

RUN cd src

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:docker"]
