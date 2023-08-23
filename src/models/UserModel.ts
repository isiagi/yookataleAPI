import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

interface User {
  email: String;
  password: String;
  createdAt: Date;
  location: String;
  bio: String;
  address: String;
  telephone: String;
  socialmedia: String;
  userImage: String;
}

interface UserDocument extends Document {
  password: string;
  isModified: (field: string) => boolean;
}

const userSchema = new Schema<User>({
  userImage: {
    type: String,
    required: [true, "Please provide user Image"],
  },
  email: {
    type: String,
    required: [true, "Please input a valid email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please input password"],
  },
  location: {
    type: String,
    required: [true, "PLease provide location"],
  },
  bio: {
    type: String,
    required: [true, "PLease provide bio"],
  },
  address: {
    type: String,
    required: [true, "PLease provide address"],
  },
  telephone: {
    type: String,
    required: [true, "PLease provide address"],
  },
  socialmedia: {
    type: String,
    required: [true, "PLease provide address"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedJwtToken = async function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: 7000,
  });
};

const User = model<User>("User", userSchema);

export default User;
