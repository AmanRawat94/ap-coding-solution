require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./utils/db");
const userRoutes = require("./routes/user-routes.js");
const authRoutes = require("./routes/auth-route.js");
const postRoutes = require("./routes/post-route.js");
const commentRoutes = require("./routes/comment-route.js");
const contactRoutes = require("./routes/contact-route.js");
const cookieParser = require("cookie-parser");
const path = require("path");

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/contact", contactRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = 3000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
