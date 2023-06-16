FROM node:16-alpine

WORKDIR /app
COPY . .

RUN npm i

RUN npm run build

EXPOSE 3010

CMD ["npm", "run", "start"]