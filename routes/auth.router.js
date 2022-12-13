const { config } = require("./../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRouter = require("express").Router();

const UserService = require("./../services/user.service");
const userService = new UserService();

authRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { username, password } = body;

    console.log(body);
    const user = await userService.findByUsername(username);
    console.log("entro", user);

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      res.status(401).json({
        error: "invalid user or password",
      });
    }

    const userForToken = {
      id: user.id,
      username: user.username,
    };

    console.log(userForToken);

    const token = jwt.sign(userForToken, config.secretKey, {
      expiresIn: "1d",
    });

    res.send({
      id: user.id,
      username: user.username,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
