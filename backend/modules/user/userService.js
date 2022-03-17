import User from "./user.js";

const UserService = {
  async create(user) {
    return User.create(user);
  },
  async getUsers() {
    return User.find();
  },
  async getUser(id) {
    if (!id) {
      throw new Error("Id is required.");
    }
    return User.findById(id);
  },
  async update(user) {
    if (!user._id) {
      throw new Error("Id is required.");
    }
    return User.findByIdAndUpdate(user._id, user, { new: true });
  },
  async delete(id) {
    if (!id) {
      throw new Error("Id is required.");
    }
    return User.findByIdAndDelete(id);
  },
};

export default UserService;
