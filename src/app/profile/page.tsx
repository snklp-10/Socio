"use client";
import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Convert image to Base64
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string); // Convert image to Base64
        setPreview(reader.result as string); // Show preview
      };
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/posts", {
        userId: "your-user-id", // Replace with logged-in user ID
        content,
        image, // Base64 image
      });

      console.log("Post created:", response.data);
      setContent("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error uploading post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload a Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded-lg"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white"
        />
        {preview && (
          <img src={preview} alt="Preview" className="w-full rounded-lg mt-4" />
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
