import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";


import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
dotenv.config();

const app = express();
const Port = 8080;

const corsOptions = {
  origin: 'http://127.0.0.1:5173', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);



app.get("/", async (req, res) => {
  res.send("Hello from VisionAI");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
