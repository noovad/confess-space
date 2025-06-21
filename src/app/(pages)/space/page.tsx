"use client";

import Head from "next/head";
import { SpaceCard } from "./components/SpaceCard";
import { CreateSpaceDialog } from "@/app/(pages)/space/components/CreateSpaceDialog";
import { useSpaceStore } from "@/app/store/useSpaceStore";
import { useEffect } from "react";

const SpacesPage = () => {
  const { availableSpaces, fetchAvailableSpaces } = useSpaceStore();

  useEffect(() => {
    fetchAvailableSpaces();
  }, []);

  return (
    <>
      <Head>
        <title>Spaces</title>
      </Head>

      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex flex-row items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Available Spaces</h1>
          <CreateSpaceDialog />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableSpaces.map(
            (space) => (
              (<SpaceCard key={space.slug} space={space} />)
            )
          )}
        </div>
      </main>
    </>
  );
};

export default SpacesPage;
