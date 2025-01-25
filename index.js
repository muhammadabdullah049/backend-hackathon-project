import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";
import testStudent from "./routers/testStudent.js";
import userRoute from "./routers/userRoute.js";
import authRoute from "./routers/authRoute.js";

// Initialize express app
const app = express();
const PORT = 4000;
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan("tiny"));
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/student", testStudent);

app.get("/", (req, res) => res.send("Express on Vercel"));

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
