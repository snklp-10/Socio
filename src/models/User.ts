import mongoose, { Schema, Document } from "mongoose";

// Interface for User Model
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  createdAt: Date;
}

// User Schema Definition
const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePicture: {
      type: String,
      default: "", // Optional: Default profile picture can be set if needed
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
