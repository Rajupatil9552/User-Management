import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";
import analyticsRoutes from "./Routes/analyticsRoutes.js";
import notificationRoutes from "./Routes/notificationRoutes.js";
import { connectDB } from "./Config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(express.json());
connectDB();


app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notify", notificationRoutes);

//error handling middelware for routes not found
app.use((req, res, next) => {
    res.status(404).send("Route not found");
});

app.listen(PORT, (req,res) => {
    console.log(`Example app listening on port ${PORT}`)
})

export default app;
