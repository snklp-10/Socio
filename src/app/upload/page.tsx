"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Input } from "@/components/ui/input"; // ShadCN Input
import { Textarea } from "@/components/ui/textarea"; // ShadCN Textarea
import { Label } from "@/components/ui/label"; // ShadCN Label

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch user ID from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert("You're not logged in.");
      router.push("/login"); // Redirect to login if no user found
    }
  }, []);

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Handle post upload
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content && !image) {
      alert("Please add a caption or image!");
      return;
    }

    if (!userId) {
      alert("User ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    setLoading(true);
    try {
      await axios.post("/api/upload", formData);
      alert("Post uploaded successfully!");
      router.push("/home"); // Redirect to homepage after upload
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Failed to upload post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create a New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Caption Input */}

          {/* Image Upload Input */}
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-gray-500 text-sm">Image Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="mt-2 rounded-md max-h-48"
              />
            </div>
          )}
          <div>
            <Label htmlFor="content">Caption</Label>
            <Textarea
              id="content"
              placeholder="Write something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Upload Button */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>
    </div>
  );
}
