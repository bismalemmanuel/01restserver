const { Router } = require('express');
const {
  createCategory,
  updateCategory,
  deleteCategory,
  findCategories,
  findCategory,
} = require('../controllers/category.controller');
const { validCategoryById } = require('../middlewares/category.middleware');

const router = Router();

router.get('/', findCategories);

router.get('/:id', validCategoryById, findCategory);

router.post('/', createCategory);

router.patch('/:id', validCategoryById, updateCategory);

router.delete('/:id', validCategoryById, deleteCategory);

module.exports = {
  categoriesRouter: router,
};
