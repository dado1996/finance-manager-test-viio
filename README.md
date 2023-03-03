# Personal Finance Manager - Test Application for Viio

Author: Diego Alejandro Delgado Otálora

---
## Run the project
Before running the project you need to configure environment variables
For that you can use the .env.example as a guide

You can run the project either by using commands or docker
```
npm run build
npm run start
```

Then you need to set up your database by running
```
npx prisma generate
```

or (assuming you have docker installed on your computer)
```
docker-compose up
```

You can use the .env.example to set up the environment variables for the project

---

## Run the tests
```
npm run test
```