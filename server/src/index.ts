import express from "express";
import cors from "cors";
import photoRoutes from "./routes/photo.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("Gallery API is running"));
app.use("/photos", photoRoutes);
app.use("/comments", commentRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);