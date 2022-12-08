const express = require("express");
const responseRouter = express.Router();

const ResponseService = require("../services/response.service");
const responseService = new ResponseService();
const validatorHandler = require("../middleware/validator.handler");
const {
  createResponseSchema,
  updateResponseSchema,
  getResponseSchema,
} = require("./../schemas/response.schema");

const { verifyToken } = require("./../middleware/userExtractor");

responseRouter.get("/", verifyToken, async (req, res, next) => {
  try {
    const answers = await responseService.findAll();
    res.status(200).json(answers);
  } catch (error) {
    next(error);
  }
});

responseRouter.get(
  "/:id",
  verifyToken,
  validatorHandler(getResponseSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const response = await responseService.findOne(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

responseRouter.post(
  "/",
  verifyToken,
  validatorHandler(createResponseSchema, "body"),
  async (req, res, next) => {
    try {
      const { body, user } = req;
      const { text, questionId } = body;
      const dataForResponse = {
        text,
        questionId,
        userId: user.id,
      };
      const savedResponse = await responseService.create(dataForResponse);
      res.status(201).json(savedResponse);
    } catch (error) {
      next(error);
    }
  }
);

responseRouter.put(
  "/:id",
  verifyToken,
  validatorHandler(getResponseSchema, "params"),
  validatorHandler(updateResponseSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const { text, questionId } = body;
      const dataForResponse = {
        text,
        questionId,
        userId: user.id,
      };
      const updatedResponse = await responseService.update(id, dataForResponse);
      res.status(200).json(updatedResponse);
    } catch (error) {
      next(error);
    }
  }
);

responseRouter.delete(
  "/:id",
  verifyToken,
  validatorHandler(getResponseSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const responseId = await responseService.delete(id);
      res.status(204).json(responseId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = responseRouter;
