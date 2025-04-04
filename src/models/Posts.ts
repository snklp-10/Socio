import mongoose, { Schema, Document, Types } from "mongoose";
import UserModel from "./User";

export interface ILike {
  userId: Types.ObjectId;
  createdAt: Date;
}

export interface IComment {
  userId: Types.ObjectId;
  comment: string;
  createdAt: Date;
}

export interface IPost extends Document {
  userId: Types.ObjectId;
  content: string;
  image?: string;
  likes: ILike[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const LikeSchema: Schema<ILike> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const CommentSchema: Schema<IComment> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const PostSchema: Schema<IPost> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    likes: { type: [LikeSchema], default: [] },
    comments: { type: [CommentSchema], default: [] },
  },
  { timestamps: true }
);

const PostModel =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default PostModel;
