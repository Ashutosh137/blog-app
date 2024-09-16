import React from "react";

function Heading({ label }: { label: string }) {
  return (
    <h2 className="text-4xl font-bold text-center py-6 capitalize text-gray-100">
      {label}
    </h2>
  );
}

export default Heading;
