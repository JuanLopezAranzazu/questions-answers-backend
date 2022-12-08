const express = require("express");
const categoryRouter = express.Router();

const CategoryService = require("../services/category.service");
const categoryService = new CategoryService();
const validatorHandler = require("../middleware/validator.handler");
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require("./../schemas/category.schema");

categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await categoryService.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const category = await categoryService.findOne(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

categoryRouter.post(
  "/",
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const savedCategory = await categoryService.create(body);
      res.status(201).json(savedCategory);
    } catch (error) {
      next(error);
    }
  }
);

categoryRouter.put(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const updatedCategory = await categoryService.update(id, body);
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

categoryRouter.delete(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const categoryId = await categoryService.delete(id);
      res.status(204).json(categoryId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = categoryRouter;
