const ToDoModel = require('../models/todoModel');

module.exports.getToDo = async (req, res) => {
  try {
    const todo = await ToDoModel.find();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports.saveToDo = async (req, res) => {
  const text = req.body.text;
  try {
    const todo = await ToDoModel.create({text});
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports.updateTodo = async (req, res) => {
  const { id: _id } = req.params;
  const text = req.body.text;

  try {
    const updatedTodo = await ToDoModel.findByIdAndUpdate(
      _id,
      {text},
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports.deleteTodo = async (req, res) => {
  const { id: todoID } = req.params;
  try {
    const todo = await ToDoModel.findOneAndDelete({ _id: todoID });

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// module.exports = { getTodos, saveTodo, deleteTodo, updateTodo };
