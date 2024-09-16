import Link from "next/link";
import React from "react";
function Tag({ label }: { label: string }) {
  return (
    <Link
      href={`/Tag/${label}`}
      className="bg-primary2 text-gray-100 text-sm textnone font-medium px-4 py-2 rounded-full shadow-md  transition-transform transform hover:scale-105"
    >
      <span className="textnone">#{label}</span>
    </Link>
  );
}

export default Tag;
