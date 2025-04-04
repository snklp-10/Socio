import { NextResponse } from "next/server";

import mongoose from "mongoose";
import UserModel from "@/models/User";
import PostModel from "@/models/Posts";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as File | null;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let base64Image = "";
    if (image) {
      const bytes = await image.arrayBuffer();
      base64Image = `data:${image.type};base64,${Buffer.from(bytes).toString(
        "base64"
      )}`;
    }

    const newPost = new PostModel({
      userId,
      content,
      image: base64Image, // Store the image as Base64
    });
    await newPost.save();

    return NextResponse.json(
      { message: "Post uploaded successfully", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to upload post" },
      { status: 500 }
    );
  }
}
