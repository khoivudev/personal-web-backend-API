require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const apiRouter = require("./routes/api/api");
const apiTodoTaskRouter = require("./routes/api/todotask");
const apiQuoteRouter = require("./routes/api/quote");
const apiProjectRouter = require("./routes/api/project");

//Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//
app.use("/api/", apiRouter);
app.use("/api/todotask", apiTodoTaskRouter);
app.use("/api/quote", apiQuoteRouter);
app.use("/api/project", apiProjectRouter);

///API endpoint
app.get("/", (req, res) => {
  res.status(200).send("Hello ! Welcome to VHK services API");
});

//Connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
