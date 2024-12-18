const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/userRouter");

const app = express();
const PORT = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
