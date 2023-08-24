import uploader from "../../utils/uploader";
import User from "../models/UserModel";
import { Request, Response } from "express";

type CustomRequest = Request & { user: any } & any;

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
    const { email, password, location, bio, address, telephone, socialmedia } =
      req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    try {
      const userImage = await uploader(req, res);

      const newUser = await User.create({
        email,
        password,
        location,
        bio,
        address,
        telephone,
        socialmedia,
        userImage,
      });
      return signToken(res, 200, newUser);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  getUser: async (req: CustomRequest, res: Response) => {
    const loggedInUser = req.user.id;
    try {
      let user = await User.find({ _id: loggedInUser }).select("-password");

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  updateUser: async (req: CustomRequest, res: Response) => {
    const loggedInUser = req.user.id; // Assuming you pass the user's ID as a parameter

    try {
      const userImage = await uploader(req, res);

      const updateFields = {
        email: req.body.email,
        location: req.body.location,
        bio: req.body.bio,
        address: req.body.address,
        telephone: req.body.telephone,
        socialmedia: req.body.socialmedia,
        userImage,
      };

      // Use Mongoose's update method to update the user
      const result = await User.updateOne({ _id: loggedInUser }, updateFields);

      if (result.modifiedCount === 0) {
        // If modifiedCount is 0, it means no user was updated
        return res
          .status(404)
          .json({ message: "User not found or no changes made" });
      }

      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

const signToken = async function (res: any, status: any, user: any) {
  const token = await user.getSignedJwtToken();

  return res.status(status).json({ message: "success", token });
};

export default userController;
