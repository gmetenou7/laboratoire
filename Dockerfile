FROM node:16.0 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#RUN ls

ENV PORT=3010

EXPOSE ${PORT}

CMD ["npm","start"]