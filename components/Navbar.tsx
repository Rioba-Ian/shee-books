import React from "react";
import Link from "next/link";
import { PiBooks } from "react-icons/pi";
// import "./Navbar.css";

function Navbar() {
  return (
    <nav className="space-x-6 py-3 border-b flex items-center justify-between px-[10vmin]">
      <Link href="/">
        <PiBooks className="text-gray-700 text-5xl" />
      </Link>
      <ul className="flex-1 flex space-x-6 outline-red-600">
        <li className="push-right" style={{ marginLeft: "auto" }}>
          <Link
            href="/books"
            className="text-blue-500 hover:text-blue-800 transition-all"
          >
            Books
          </Link>
        </li>
        <li>
          <Link
            href="/books"
            className="text-blue-500 hover:text-blue-800 transition-all"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-blue-500 hover:text-blue-800 transition-all"
          >
            Contact
          </Link>
        </li>
        <li className="push-right" style={{ marginLeft: "auto" }}>
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-800 transition-all"
          >
            Login
          </Link>
        </li>
        <li className="push-right">
          <Link
            href="/books"
            className=" text-blue-500 hover:text-blue-800 transition-all"
          >
            SignUp
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
