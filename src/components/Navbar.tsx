"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full h-[100px] p-6 flex justify-center items-center bg-black">
      <div className="w-full h-full sm:max-w-[75%] flex justify-between items-center">
        <Link href="/" className="text-white">
          <span className="text-2xl font-bold">Socio</span>
        </Link>
      </div>
      <div className="flex space-x-4 ">
        <Link href="/login">
          <Button variant="outline">
            <span>Login</span>
          </Button>
        </Link>
        <Link href="/signup">
          <Button>
            <span className="font-bold">Sign Up</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
