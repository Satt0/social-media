var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
// var session = require('express-session')
const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const { createServer } = require("http");
const { resolvers } = require("./graphql/Resolvers");
const { typeDefs } = require("./graphql/TYPE");
const { makeExecutableSchema } = require("graphql-tools");
const { ApolloServer } = require("apollo-server-express");

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

var app = express();

// routing declaration
const userRouter = require("./routes/User");
const postRouter = require("./routes/Post");
// middleware
app.use(cors({}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }))

app.use("/api/user", userRouter);

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/post", postRouter);

// catch 404 and forward to error handler

// for ssr react app
app.use(express.static('client'))
app.get('/*',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'client/index.html'))
})

// error handler

// module.exports = app;

const apolloServer = new ApolloServer({
  schema: schema,
  context: ({ req }) => {
    return {
      ...req,
      pubsub,
    };
  },
});
const server = createServer(app);

apolloServer.applyMiddleware({ app });
apolloServer.installSubscriptionHandlers(server);

app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 400);
  res.json({ error: err.message });
});

server.listen(4000, () => {
  console.log("🚀server start at port 4000");
});
