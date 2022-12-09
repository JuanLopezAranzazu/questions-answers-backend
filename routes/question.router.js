const express = require("express");
const questionRouter = express.Router();

const QuestionService = require("../services/question.service");
const questionService = new QuestionService();
const validatorHandler = require("../middleware/validator.handler");
const {
  createQuestionSchema,
  updateQuestionSchema,
  getQuestionSchema,
} = require("./../schemas/question.schema");

const { verifyToken } = require("./../middleware/userExtractor");

questionRouter.get("/", verifyToken, async (req, res, next) => {
  try {
    const questions = await questionService.findAll();
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
});

questionRouter.get(
  "/:id",
  verifyToken,
  validatorHandler(getQuestionSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const question = await questionService.findOne(id);
      res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }
);

questionRouter.post(
  "/",
  verifyToken,
  validatorHandler(createQuestionSchema, "body"),
  async (req, res, next) => {
    try {
      const { body, user } = req;
      console.log("user", user);
      const { title, description, categoryId } = body;
      const dataForQuestion = {
        title,
        description,
        categoryId,
        userId: user.id,
      };
      console.log("data", dataForQuestion);
      const savedQuestion = await questionService.create(dataForQuestion);
      res.status(201).json(savedQuestion);
    } catch (error) {
      next(error);
    }
  }
);

questionRouter.put(
  "/:id",
  verifyToken,
  validatorHandler(getQuestionSchema, "params"),
  validatorHandler(updateQuestionSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body, user } = req;
      const { id } = params;
      const { title, description, categoryId } = body;
      const dataForQuestion = {
        title,
        description,
        categoryId,
        userId: user.id,
      };
      const updatedQuestion = await questionService.update(id, dataForQuestion);
      res.status(200).json(updatedQuestion);
    } catch (error) {
      next(error);
    }
  }
);

questionRouter.delete(
  "/:id",
  verifyToken,
  validatorHandler(getQuestionSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const questionId = await questionService.delete(id);
      res.status(204).json(questionId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = questionRouter;
