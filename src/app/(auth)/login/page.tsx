"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import asset1 from "../../../../public/assest-1.png";
import asset2 from "../../../../public/assest-2.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", { email, password });

      if (response.status === 200) {
        localStorage.setItem("userId", response.data.userId); // ✅ store userId
        alert("Login successful!");
        router.push("/home");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Error logging in.");
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
      <div className="p-8 rounded-lg shadow-md w-120 border border-gray-300/50">
        <div className="flex justify-between items-center text-2xl font-semibold mb-6">
          <Link href="/" className="text-white">
            Socio
          </Link>
          <h2 className="text-white text-2xl font-semibold text-center">
            Login
          </h2>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/35">
              Email
            </label>
            <Input
              type="email"
              className="w-full p-2 border border-gray-300/15 rounded-md text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/35">
              Password
            </label>
            <Input
              type="password"
              className="w-full p-2 border border-gray-300/15 rounded-md text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <div className="flex gap-2">
            <span className="text-white/40">New to Socio?</span>
            <Link href="/signup" className="text-white">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
