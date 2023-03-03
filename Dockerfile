FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV DATABASE_URL=mysql://root:12345@localhost:3306/finance_manager

ENV JWT_KEY=this_is_the_private_key

EXPOSE 3000

RUN npm run build

RUN npx prisma generate

CMD [ "npm", "start" ]