import User from "../models/UserModel";
import { Request, Response } from "express";

const userController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user: any = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    return signToken(res, 200, user);
  },

  register: async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    try {
      const newUser = await User.create({
        username: username,
        password: password,
        email: email,
      });
      return signToken(res, 200, newUser);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};

const signToken = async function (res: any, status: any, user: any) {
  const token = await user.getSignedJwtToken();

  return res.status(status).json({ message: "success", token });
};

export default userController;
