/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Head from "next/head";
import { SpaceCard } from "./components/SpaceCard";
import { CreateSpaceDialog } from "@/app/(pages)/space/components/CreateSpaceDialog";
import { useSpaceStore } from "@/app/store/useSpaceStore";
import { useEffect } from "react";
import { AppSearchForm } from "@/components/app-search-form/AppSearchForm";
import React from "react";
import { PaginationControls } from "@/components/ui/pagination/PaginationControls";

const SpacesPage = () => {
  const {
    availableSpaces,
    fetchAvailableSpaces,
    havedSpace,
    checkSpaceExistsByOwner,
  } = useSpaceStore();

  useEffect(() => {
    fetchAvailableSpaces();
    checkSpaceExistsByOwner();
  }, []);

  const handle = async (search: string) => {
    await fetchAvailableSpaces(search);
  };

  const paginationChange = async (page: number) => {
    await fetchAvailableSpaces(undefined, page);
  };

  return (
    <>
      <Head>
        <title>Spaces</title>
      </Head>

      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex flex-row items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Available Spaces</h1>
          {!havedSpace && <CreateSpaceDialog />}
        </div>
        <AppSearchForm className="max-w-sm pb-8" onSearch={handle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableSpaces?.spaces &&
            availableSpaces.spaces.map((space) => (
              <SpaceCard key={space.slug} space={space} />
            ))}
        </div>
        {availableSpaces && availableSpaces.total_pages > 1 && (
          <div className="mt-6 flex justify-start">
            <PaginationControls
              currentPage={availableSpaces.page}
              totalPages={availableSpaces.total_pages}
              onPageChange={paginationChange}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default SpacesPage;
