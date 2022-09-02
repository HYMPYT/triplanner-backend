FROM node:16
 
COPY . .

RUN npm i
RUN npm run build

CMD ["npm","start"]