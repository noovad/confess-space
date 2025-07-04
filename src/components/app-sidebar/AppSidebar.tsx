"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavHeader } from "./components/NavHeader";
import { AvailableSpaces } from "./components/AvailableSpaces";
import { NavUser } from "./components/NavUser";
import { FollowingSpaces } from "./components/FollowingSpaces";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-4">
        <NavHeader />
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <FollowingSpaces />
        <hr className="mx-4" />
        <AvailableSpaces />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
