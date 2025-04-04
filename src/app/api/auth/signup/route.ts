import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User";
import dbConnect from "@/lib/db";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const profilePictureFile = formData.get("profilePicture") as File | null;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert image file to Base64
    let profilePicture = "";
    if (profilePictureFile) {
      const buffer = await profilePictureFile.arrayBuffer();
      profilePicture = Buffer.from(buffer).toString("base64");
    }

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      profilePicture: profilePicture
        ? `data:image/png;base64,${profilePicture}`
        : "",
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
