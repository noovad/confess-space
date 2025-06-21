/* eslint-disable react-hooks/exhaustive-deps */
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
import { useUserSpaceStore } from "@/app/store/useUserSpaceStore";

export function FollowingSpaces() {
  const { fetchOwnSpace, ownSpace } = useSpaceStore();
  const pathname = usePathname();
  const { followingSpaces, fetchFollowingSpaces } = useUserSpaceStore();
  useEffect(() => {
    const u = getUserFromClientCookie();
    if (u?.id) {
      fetchFollowingSpaces(u.id);
    }
    fetchOwnSpace();
  }, []);

  return (
    <SidebarGroup className="overflow-auto group-data-[collapsible=icon]:hidden">
      <hr className="mb-4 border-black border-t-2" />
      <SidebarMenu className="overflow-y-auto mt-2">
        {ownSpace && (
          <SidebarMenuItem>
            <p className="ps-2 pt-2 text-xs text-muted-foreground">My Spaces</p>
            <SidebarMenuButton
              asChild
              className={cn(
                "flex justify-between items-center w-full hover:bg-white",
                "data-[active=true]:bg-black"
              )}
              isActive={isSpaceActive(pathname, ownSpace.slug)}
            >
              <Link href={`/space/${ownSpace.slug}`}>
                <span
                  className={
                    isSpaceActive(pathname, ownSpace.slug)
                      ? "text-white"
                      : undefined
                  }
                >
                  {ownSpace.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
        <p className="ps-2 pt-2 text-xs text-muted-foreground">
          Following Spaces
        </p>
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
