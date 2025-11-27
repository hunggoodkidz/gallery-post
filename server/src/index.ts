import express from "express";
import cors from "cors";
import photoRoutes from "./routes/photo.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import swaggerSpec from "./lib/swagger.js";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => res.send("Gallery API is running"));
app.use("/photos", photoRoutes);
app.use("/comments", commentRoutes);

app.listen(PORT, () =>
  console.log(`Server running at: http://localhost:${PORT}/api-docs`)
);
