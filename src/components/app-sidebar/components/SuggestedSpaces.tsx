"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SpaceDto } from "@/dto/spaceDto";
import { isSpaceActive } from "@/utils/sidebar-utils";

interface FollowingSpacesProps {
  spaces: SpaceDto[];
}

export function SuggestedSpaces({ spaces }: FollowingSpacesProps) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <p className=" ps-2 pt-2 text-xs text-muted-foreground">
            Suggested Spaces
          </p>
          {spaces.map((item) => (
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
        <SidebarMenu>
          <SidebarMenuItem className="pb-4 pt-2">
            <Link href={"/space"}>
              <SidebarMenuButton className="">
                <span>See All... </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
