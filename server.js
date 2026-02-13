const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const testRoutes = require("./routes/testRoutes");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");

//dotenv configuration
dotenv.config();

//DB connection
connectDb();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/food", foodRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/admin", adminRoutes);

//routing kri hai
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Food Server App!</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//listening
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.america);
});
