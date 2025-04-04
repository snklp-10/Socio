import dbConnect from "@/lib/db";
import PostModel from "@/models/Posts";
import { NextResponse } from "next/server";

// Handle GET and POST requests for posts
export async function GET() {
  try {
    console.log("Connecting to DB...");
    await dbConnect();
    console.log("Fetching posts...");

    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate("userId", "username profilePicture");

    console.log("Posts fetched:", posts.length);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse("Error fetching posts", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, content, image } = await request.json();
    await dbConnect();

    if (!userId || !content) {
      return NextResponse.json(
        { message: "userId and content are required" },
        { status: 400 }
      );
    }

    const newPost = await PostModel.create({
      userId,
      content,
      image: image || "", // Ensure image URL is stored properly
      likes: [],
      comments: [],
    });

    return NextResponse.json(
      { message: "Post created", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
