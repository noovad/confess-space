"use client";

import { useEffect, useState } from "react";
import { ChevronsUpDown, LogOut, User2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AppAvatarUser } from "@/components/app-avatar-user/AppAvatarUser";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserDto } from "@/dto/userDto";

export function NavUser() {
  const router = useRouter();
  const { logout, deleteAccount } = useAuthStore();
  const [user, setUser] = useState<UserDto | null>(null);

  const handleDeleteAccount = async () => {
    const result = await deleteAccount();
    if (result) {
      router.push("/login");
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      router.push("/login");
    }
  };

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <AppAvatarUser
                name={user.name}
                username={user.username}
                avatarType={user.avatarType}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.username}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <AppAvatarUser
                  name={user.name}
                  username={user.username}
                  avatarType={user.avatarType}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.username}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
                onClick={() => router.push(`/profile/${user.username}`)}
              >
                <User2 />
                Change Name
              </Button>

              <DropdownMenuSeparator />
              <Dialog>
                <DialogTrigger className="w-full justify-start">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <User2 />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete your account?</DialogTitle>
                    <DialogDescription>
                      Deleting your account is permanent and cannot be undone.
                      All your data will be removed from our servers. Are you
                      sure you want to continue?
                    </DialogDescription>
                    <DialogFooter className="mt-4">
                      <Button size="sm" onClick={handleDeleteAccount}>
                        Delete Account
                      </Button>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <DropdownMenuSeparator />
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut />
                Log out
              </Button>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
