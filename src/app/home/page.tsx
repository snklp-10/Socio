import Feed from "@/components/Feed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="sticky top-0  flex items-center justify-center h-15 bg-black border-b-gray-50/50 ">
        <span className="text-white text-2xl font-semibold">Socio</span>
      </div>
      <main className="">
        <Feed />
      </main>
      <Button className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-xl p-3 shadow-lg">
        <Link href="/upload">Create Post</Link>
      </Button>
    </div>
  );
};

export default page;
