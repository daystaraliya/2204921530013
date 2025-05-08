import express from "express";
import numberRoutes from "./routes/average.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = 9876;

app.use(express.json());
app.use("/", numberRoutes);

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
