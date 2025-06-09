"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavHeader } from "./components/NavHeader";
import { SuggestedSpaces } from "./components/SuggestedSpaces";
import { FollowingSpaces } from "./components/FollowingSpaces";
import followingSpaces from "@/data/followingSpaces";
import suggestedSpaces from "@/data/suggestedSpaces";
import { NavUser } from "./components/NavUser";
import user from "@/data/user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-4">
        <NavHeader />
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <FollowingSpaces spaces={followingSpaces} />
        <hr className="mx-4" />
        <SuggestedSpaces spaces={suggestedSpaces} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
