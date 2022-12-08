const questionRouter = require("./question.router");
const categoryRouoter = require("./category.router");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const responseRouter = require("./response.router");

function routes(app) {
  app.use("/api/v1/questions", questionRouter);
  app.use("/api/v1/categories", categoryRouoter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/answers", responseRouter);
}

module.exports = routes;
