"use client";
import { TextArea, TextField } from "@radix-ui/themes";
import React from "react";

interface BookFormProps {
  title: string;
  description: string;
  isbn: number;
  year_pub: number;
  images?: string[];
  authorId: string;
  genreId: string;
}

const BookForm = () => {
  return (
    <div className="max-w-xl mx-auto space-y-4">
      <TextField.Input placeholder="Title" />
      <TextArea placeholder="Enter Book Description ..." />
      <TextField.Input placeholder="ISBN" type="number" min={0} />
      <TextField.Input placeholder="Year Published" type="number" min={0} />

      <TextField.Input placeholder="Genre" />
    </div>
  );
};

export default BookForm;
