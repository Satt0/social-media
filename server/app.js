var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require('express-session')



var app = express();

// routing declaration
const userRouter = require("./routes/User");
const postRouter=require('./routes/Post')
// middleware
app.use(cors({
  credentials: true, 
  Origin: 'http://localhost:3000', // web front end server address
}))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use('/public',express.static(path.join(__dirname, "public")));
app.get('/cookies',(req,res)=>{
 if(req.session.user){
   res.send(req.session.user)
 }else{
  req.session.user="tan"
  res.send('inited')
 }
})
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});
// app.use(express.static('client'))
// app.get('/*',(req,res,next)=>{
//   res.sendFile(path.join(__dirname,'client/index.html'))
// })


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
