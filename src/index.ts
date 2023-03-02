import express, { Request, Response, json } from "express";
import "dotenv/config";
import routesApi from "./routes/index";
import { errorHandler } from "./middlewares/error.handler";

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.json({
    hello: 'world',
  })
});

app.use(json());
routesApi(app);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});