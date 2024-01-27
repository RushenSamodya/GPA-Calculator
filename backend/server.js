const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ModuleRoutes = require("./routes/moduleRoutes");
const UserRoutes = require("./routes/userRoutes");
const SelectiveRoutes = require("./routes/selectiveRoutes");
const cors = require("cors");

// Create express app
const app = express();
dotenv.config();

PORT = process.env.PORT;

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/v1/module", ModuleRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/selective", SelectiveRoutes);

// Connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    // Handle error appropriately
    console.error("Error connecting to database:", error);
  });
