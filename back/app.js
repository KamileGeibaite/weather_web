import express from "express";
import cors from "cors";
import logRoutes from "./routes/logRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/v1/logs", logRoutes);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "server is running",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
});

export default app;
