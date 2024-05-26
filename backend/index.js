import express from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { booksRoute } from "./routes/booksRoute.js";
import cors from "cors";

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("App is connected to DataBase");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

// MiddleWare for parsing request body
app.use(express.json());

// CORS POLICY  
//option 1
// app.use(cors());
//option 2
app.use(
  cors({
    origin: 'https://book-store-mern-ufru.vercel.app',
    methods: ['GEt', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
)

app.get("/", (req, res) => {
  res.status(200).send("Welcome To MERN-BookStore");
});

app.use("/books", booksRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
