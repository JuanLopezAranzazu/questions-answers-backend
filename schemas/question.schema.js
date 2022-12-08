const Joi = require("joi");

const id = Joi.number().integer();
const title = Joi.string();
const description = Joi.string();
const categoryId = Joi.number().integer();

const createQuestionSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updateQuestionSchema = Joi.object({
  title: title,
  description: description,
  categoryId: categoryId,
});

const getQuestionSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createQuestionSchema,
  updateQuestionSchema,
  getQuestionSchema,
};
