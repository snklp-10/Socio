import Navbar from "@/components/Navbar";
import Feed from "@/components/Feed";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import asset1 from "../../public/assest-1.png";
import asset2 from "../../public/assest-2.png";
import asset3 from "../../public/assest-3.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="flex items-center justify-center my-10">
        <span className="text-4xl font-bold max-w-lg text-center text-white">
          Your Stories, Your Space <span className="text-blue-400">Share</span>,{" "}
          <span className="text-rose-500">Like</span>,{" "}
          <span className="text-orange-400">Connect</span>
        </span>
      </div>
      <div className="flex max-w-lg h-1/2 items-center justify-center ml-20">
        <div className="flex px-20">
          <Image
            src={asset1}
            alt="image"
            width={350}
            height={400}
            className="relative top-20 left-10"
          />
          <Image
            src={asset2}
            alt="image"
            width={350}
            height={400}
            className="relative top-60 right-10"
          />
          <Image
            src={asset2}
            alt="image"
            width={350}
            height={400}
            className="relative top-15 right-20"
          />
          <Image
            src={asset1}
            alt="image"
            width={350}
            height={400}
            className="relative top-30 right-30"
          />
          <Image
            src={asset3}
            alt="image"
            width={350}
            height={400}
            className="relative top-15 right-40"
          />
        </div>
      </div>
    </div>
  );
}
