require("dotenv").config();

const PORT = process.env.PORT;
const DB_PATH = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_PARAMS}`;

const Application = require("./framework/Application");
const mongoose = require("mongoose");
const userRouter = require("./src/user-router");
const jsonParser = require("./framework/parseJson");
const parseUrl = require("./framework/parseUrl");

const app = new Application();

app.use(jsonParser);
app.use(parseUrl(`http://localhost:${PORT}`));

app.addRouter(userRouter);

const start = async () => {
  try {
    await mongoose.connect(DB_PATH);
    app.listen(PORT, () => console.log("WE START SERVEER ON PORT: ", PORT));
  } catch (err) {
    console.log("OMG! WE GET AN ERRORRR: ", err);
  }
};

start();
