import * as dotenv from 'dotenv'
dotenv.config()

import app from "./server";

app.listen(3001, () => {
  console.log("http://localhost:3001 에 서버가 돌고 있어요!");
});
