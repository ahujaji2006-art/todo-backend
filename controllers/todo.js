import { ToDo } from "../models/todo.js";

export async function addTodo(req, res) {
  try {
    console.log("1");
    const { task } = req.body;
    const userId = req.user.id;
    console.log("2");
    const todo = await ToDo.create({
      task,
      userId,
    });
    console.log("3");
    return res.status(200).json({
      message: "ToDo Added Successfully",
      todo,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function allTodo(req, res) {
  try {
    const userId = req.user.id;
    const todo = await ToDo.find({ userId,isDelete:false }).populate("userId");
    return res.status(200).json({
      message: "All Todo's",
      todo,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function todoStatusUpdate(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const todo = await ToDo.findByIdAndUpdate(id, { status }, { new: true });
    if (!todo) {
      return res.status(404).json({
        message: "ToDo not found",
      });
    }
    return res.status(200).json({
      message: "ToDo status updated successfully",
      todo,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function deleteToDo(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id
    const todo = await ToDo.findOneAndUpdate(
        { _id: id, userId },
        { isDelete: true },  
        { new: true }   
      )
    return res.status(200).json({
      message: "ToDo Delete Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}
