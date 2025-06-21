"use client";

import { SpaceDto } from "@/dto/spaceDto";
import Link from "next/link";

interface SpaceCardProps {
  space: SpaceDto;
}

export const SpaceCard = ({ space }: SpaceCardProps) => {
  return (
    <Link href={`/space/${space.slug}`}>
      <div className="border p-4 rounded hover:shadow cursor-pointer transition-all">
        <h2 className="text-lg font-semibold">{space.name}</h2>
        <p className="text-sm text-gray-600">{space.description}</p>
        <p className="text-xs text-gray-500 mt-2">
          {(space.member_count + 1)} member
        </p>
      </div>
    </Link>
  );
};
