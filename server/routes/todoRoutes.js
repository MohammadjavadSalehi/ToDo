const express = require('express');
const {
  getToDo,
  saveToDo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const router = express.Router();

router.get('/', getToDo);
router.post('/save', saveToDo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);

module.exports = router;
