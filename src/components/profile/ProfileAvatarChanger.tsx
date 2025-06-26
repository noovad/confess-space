"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AvatarSelectorDialog } from "@/components/avatar/AvatarSelectorDialog";
import { getUserFromClientCookie } from "@/utils/getUser";
import { User2 } from "lucide-react";

export function ProfileAvatarChanger() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = getUserFromClientCookie();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          {" "}
          <User2 />
          Change Avatar{" "}
        </Button>
      </DialogTrigger>

      <AvatarSelectorDialog
        user={user}
        closeDialog={() => setIsDialogOpen(false)}
      />
    </Dialog>
  );
}
