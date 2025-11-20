// usersController.js
import * as userService from "../services/userService.js";

// GET /users

export const getAllUsersController = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// GET /users/:id
export const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
