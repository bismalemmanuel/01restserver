const { Router } = require('express');
const { check } = require('express-validator');
const {
  createUser,
  updateUser,
  deleteUser,
  findUsers,
  findUser,
} = require('../controllers/users.controllers');

const {
  validIfExistUserEmail,
  validIfExistUser,
} = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/valideteField.middleware');

const router = Router();

router.get('/', findUsers);

router.get('/:id', validIfExistUserEmail, findUser);

router.post(
  '/',
  [
    check('username', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
  ],
  validateFields,
  validIfExistUser,
  createUser
);

router.patch('/:id', validIfExistUser, updateUser);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
