"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";
import heart from "../../public/heart-svgrepo-com.svg";
import { Button } from "./ui/button";

interface Post {
  _id: string;
  userId: {
    _id: string;
    username: string;
    profilePicture: string;
  };
  content: string;
  image: string;
  createdAt: string;
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const [liked, setLiked] = useState(false);
  return (
    <div className="flex flex-col space-y-4 py-6 bg-black">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white p-4 rounded-lg shadow-md w-full max-w-xl mx-auto "
        >
          <div className="flex items-center space-x-3 mb-4 ">
            <img
              src={post.userId.profilePicture}
              alt={post.userId.username}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{post.userId.username}</h3>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="mb-4 ">{post.content}</p>
          {post.image && (
            <img
              src={post.image}
              alt="Post image"
              className="w-full rounded-lg max-h-[590px]"
            />
          )}
          <div className="mt-4 flex ">
            <button
              className="text-rose-500 flex gap-2 "
              onClick={() => setLiked(!liked)}
            >
              <span>
                {liked ? (
                  <Image src={heart} alt="Liked" width={24} height={24} />
                ) : (
                  <Heart />
                )}
              </span>
              {liked ? "Liked" : "Like"} {/* Toggle text */}
            </button>
            {/* <button className="ml-4 text-blue-500">Comment</button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
