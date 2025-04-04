"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import asset1 from "../../../../public/assest-3.png";
import asset2 from "../../../../public/assest-2.png";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle profile picture selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfilePicture(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Handle Signup Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", formData);

      if (response.status === 201) {
        alert("Signup successful! Redirecting to login...");
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Error signing up. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="flex max-w-lg h-1/2 items-center justify-center">
        <div className="flex px-20">
          <Image
            src={asset1}
            alt="image"
            width={350}
            height={400}
            className="absolute top-20 left-110 rotate-12"
          />
          <Image
            src={asset2}
            alt="image"
            width={350}
            height={400}
            className="absolute top-100 right-60 -rotate-25"
          />
        </div>
      </div>
      <div className="p-8 rounded-lg shadow-md w-120 bg-black border border-gray-300/40">
        <div className="flex justify-between items-center text-2xl font-semibold mb-6">
          <Link href="/" className="text-white">
            Socio
          </Link>
          <h2 className="text-white text-2xl font-semibold text-center">
            Sign Up
          </h2>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300/30 rounded-md text-white/50"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300/30 rounded-md text-white/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300/30 rounded-md text-white/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-white">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-white/50"
            />
          </div>

          {/* Profile Picture Preview */}
          {preview && (
            <div className="mt-2">
              <p className="text-gray-500 text-sm">Profile Picture Preview:</p>
              <img
                src={preview}
                alt="Profile Preview"
                className="rounded-md max-h-24"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-md"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="flex gap-2">
            <span className="text-white/40">Already a user?</span>
            <Link href="/login" className="text-white">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
