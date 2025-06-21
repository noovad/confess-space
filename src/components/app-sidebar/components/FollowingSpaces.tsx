"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { isSpaceActive } from "@/utils/sidebar-utils";
import { useSpaceStore } from "@/app/store/useSpaceStore";
import { getUserFromClientCookie } from "@/utils/getUser";

export function FollowingSpaces() {
  const { followingSpaces, fetchFollowingSpaces } = useSpaceStore();
  const pathname = usePathname();

  useEffect(() => {
    const u = getUserFromClientCookie();
    if (u?.id) {
      fetchFollowingSpaces(u.id);
    }
  }, []);

  return (
    <SidebarGroup className="overflow-auto group-data-[collapsible=icon]:hidden">
      <hr className="mb-4 border-black border-t-2" />
      <p className="ps-2 pt-2 text-xs text-muted-foreground">
        Following Spaces
      </p>
      {/* <AppSearchForm onSearch={handleSearch} /> */}
      <SidebarMenu className="overflow-y-auto mt-2">
        {followingSpaces.length > 0 ? (
          followingSpaces.map((space) => (
            <SidebarMenuItem key={space.id}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "flex justify-between items-center w-full hover:bg-white",
                  "data-[active=true]:bg-black"
                )}
                isActive={isSpaceActive(pathname, space.slug)}
              >
                <Link href={`/space/${space.slug}`}>
                  <span
                    className={
                      isSpaceActive(pathname, space.slug)
                        ? "text-white"
                        : undefined
                    }
                  >
                    {space.name}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        ) : (
          <SidebarMenuItem>
            <div className="px-2 py-1 text-sm text-muted-foreground">
              No spaces found
            </div>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
