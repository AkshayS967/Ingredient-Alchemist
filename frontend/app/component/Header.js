"use client";
import Image from "next/image";
import Link from "next/link";
import { Tabs, Tab } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Server from "../Server";

export default function Header() {
  const [selected, setSelected] = useState("1");

  useEffect(() => {
    Server.method = selected;
  },[selected])

  return (
    <header>
      <nav className=" bg-red-400 shadow-lg h-14 w-full z-10">
        <div className="w-full h-full max-w-6xl m-auto flex justify-between items-center">
          <Link href="/">
            <Image
                className="ml-5"
                src="/alchemist.png"
                width={160}
                height={160}
                alt="logo"
              />
          </Link>
          <Tabs selectedKey={selected} onSelectionChange={setSelected}>
            <Tab key="1" title="Apriori"></Tab>
            <Tab key="2" title="Vector DB"></Tab>
            <Tab key="3" title="Gen AI"></Tab>
          </Tabs>
          {/* <div className="w-10 h-10 rounded-full mr-5">
            <Image
              src="/account.png"
              width={50}
              height={50}
              alt="logo"
            />
          </div> */}
        </div>
      </nav>
    </header>
  );
}
