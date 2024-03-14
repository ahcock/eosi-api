import express from "express";
import router from "./routes";
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'))

app.use((req, res, next) => {
  res.status(401)
  res.send('Nope')
  next()
})

app.use("/", router);

export default app;

