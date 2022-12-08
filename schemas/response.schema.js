const Joi = require("joi");

const id = Joi.number().integer();
const text = Joi.string();
const questionId = Joi.number().integer();

const createResponseSchema = Joi.object({
  text: text.required(),
  questionId: questionId.required(),
});

const updateResponseSchema = Joi.object({
  text: text,
  questionId: questionId,
});

const getResponseSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createResponseSchema,
  updateResponseSchema,
  getResponseSchema,
};
