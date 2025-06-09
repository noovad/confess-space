"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AppSearchForm } from "@/components/app-search-form/AppSearchForm";
import { SpaceDto } from "@/dto/spaceDto";
import { isSpaceActive } from "@/utils/sidebar-utils";

interface FollowingSpacesProps {
  spaces: SpaceDto[];
}

export function FollowingSpaces({ spaces }: FollowingSpacesProps) {
  const [filteredProjects, setFilteredProjects] = useState(spaces);
  const pathname = usePathname();

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProjects(spaces);
      return;
    }

    const filtered = spaces.filter((spaces) =>
      spaces.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  return (
    <SidebarGroup className="overflow-auto group-data-[collapsible=icon]:hidden">
      <hr className="mb-4 border-black border-t-2" />
      <p className=" ps-2 pt-2 text-xs text-muted-foreground">
        Following Spaces
      </p>
      <AppSearchForm onSearch={handleSearch} />
      <SidebarMenu className="overflow-y-auto">
        {filteredProjects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className={cn(
                "flex justify-between items-center w-full hover:bg-white",
                "data-[active=true]:bg-black"
              )}
              isActive={isSpaceActive(pathname, item.slug)}
            >
              <Link href={"/space/" + item.slug}>
                <span
                  className={
                    isSpaceActive(pathname, item.slug)
                      ? "text-white"
                      : undefined
                  }
                >
                  {item.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
