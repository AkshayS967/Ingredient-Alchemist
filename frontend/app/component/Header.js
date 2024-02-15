"use client";
import Image from "next/image";
import Link from "next/link";

export default function App() {
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
