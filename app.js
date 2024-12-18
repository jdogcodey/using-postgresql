const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/userRouter");

const app = express();
const PORT = process.env.PORT;

app.get("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
