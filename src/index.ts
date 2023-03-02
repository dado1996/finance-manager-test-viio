import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({
    hello: 'world',
  })
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});