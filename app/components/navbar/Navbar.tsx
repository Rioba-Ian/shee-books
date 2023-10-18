"use client";
import React from "react";
import Link from "next/link";
import { PiBooks } from "react-icons/pi";
import { usePathname } from "next/navigation";
import "./Navbar.css";

function Navbar() {
  const currentPath = usePathname();
  return (
    <nav className="space-x-6 py-3 border-b flex items-center justify-between px-[10vmin]">
      <Link href="/">
        <PiBooks className="dark:text-gray-700 text-white text-5xl" />
      </Link>
      <ul className="flex-1 flex space-x-6 outline-red-600" id="nav-links">
        <li style={{ marginLeft: "auto" }}>
          <Link href="/books" className={``}>
            Books
          </Link>
        </li>
        <li>
          <Link href="/books" className={``}>
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className={``}>
            Contact
          </Link>
        </li>
        <li style={{ marginLeft: "auto" }}>
          <Link href="/login" className={``}>
            Login
          </Link>
        </li>
        <li>
          <Link href="/books" className={``}>
            SignUp
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
