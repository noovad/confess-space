"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface SpaceDetailProps {
  params: { space: string };
}

const DummySpaceDetail: React.FC<SpaceDetailProps> = ({}) => {
  const pathname = usePathname();

  console.log("Current Pathname:", pathname);
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Space: </h1>
      <section>
        <h2>About this Space</h2>
        <p>
          This is a dummy detail page for the space <b></b>.
        </p>
        <ul>
          <li>Owner: John Doe</li>
          <li>Members: 42</li>
          <li>Description: A sample space for demonstration purposes.</li>
        </ul>
      </section>
    </main>
  );
};

export default DummySpaceDetail;
