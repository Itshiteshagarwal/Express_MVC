const express = require("express");
const userRouter = require("./route/userRoute");
const app = express();
const mongoose = require("mongoose");
const noteRouter = require("./route/notesRoute");
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config();
// Connect to MongoDB

const PORT = process.env.PORT || 4000;
const url = process.env.MONGO_URL;
mongoose.connect(url)
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log("Server started successfully on port "+ PORT);
  });
})
.catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use('/notes', noteRouter);

app.get('/', (req, res) => {
  res.send("Hello");
});

app.get('/quote', (req, res) => {
  res.send("Quote");
});
