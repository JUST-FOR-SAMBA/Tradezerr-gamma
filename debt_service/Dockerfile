FROM node:lts

RUN apt-get -qy update && apt-get -qy install openssl

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./
# generated prisma files
COPY prisma ./prisma/
# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./
# COPY
COPY . .

RUN npm install

RUN npx prisma generate

CMD [ "npm", "start" ]