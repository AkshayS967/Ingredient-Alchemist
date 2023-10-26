"use client";
import Image from "next/image";
import { useState } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <header>
      <nav className=" bg-red-400 shadow-lg h-20">
        <div className="w-full h-full max-w-6xl m-auto flex justify-between items-center">
          <Image
            className="ml-5"
            src="/alchemist.png"
            width={200}
            height={200}
            alt="logo"
          />
          <div className="w-10 h-10 rounded-full mr-5">
            <Image
              src="/account.png"
              width={50}
              height={50}
              alt="logo"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
