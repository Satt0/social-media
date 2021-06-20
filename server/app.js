var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");



var app = express();

// routing declaration
const userRouter = require("./routes/User");
const postRouter=require('./routes/Post')
// middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    if (req.get("origin") !== process.env.CLIENT_URL) {
      next(new Error("not allowed"));
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/post", postRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 400);
  res.json({ error: err.message });
});

module.exports = app;
