import UserService from "./userService.js";

const userController = {
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
  async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      return res.json(users);
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
  async getUser(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      return res.json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
  async update({ body }, res) {
    try {
      const updatedUser = await UserService.update(body);
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
  async delete(req, res) {
    try {
      const user = await UserService.delete(req.params.id);
      return res.json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
  async login(req, res) {
    try {
      const user = await UserService.login(req.body);
      return res.json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
};

export default userController;
