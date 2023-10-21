import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const BooksPage = () => {
  return (
    <div>
      Books Page{" "}
      <Button variant="solid">
        <Link href="/books/new">New Book</Link>
      </Button>
    </div>
  );
};

export default BooksPage;
