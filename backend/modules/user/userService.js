import User from "./user.js";

const UserService = {
  async create(user) {
    return User.create(user);
  },
  async getUsers() {
    return User.find({}, "-password");
  },
  async getUser(id) {
    if (!id) {
      throw new Error("Id is required.");
    }
    return User.findById(id, "-password");
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
  async login({ email, password }) {
    if (!email || !password) {
      throw new Error("No credentials!");
    }
    const user = await User.findOne({ email, password }, "-password");
    if (user) {
      return user;
    }
    throw new Error("Wrong credentials!");
  },
};

export default UserService;
