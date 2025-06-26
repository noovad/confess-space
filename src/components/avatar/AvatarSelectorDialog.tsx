"use client";

import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserDto } from "@/dto/userDto";
import { UseAuthStore } from "@/app/store/useAuthStore";
import { AppAvatarUser } from "../app-avatar-user/AppAvatarUser";

interface AvatarSelectorDialogProps {
  user: UserDto | null;
  closeDialog: () => void;
}

const AVATAR_TYPES = [
  "notionists",
  "bottts",
  "dylan",
  "micah",
  "croodles",
  "adventurer",
  "pixel-art",
];

export function AvatarSelectorDialog({
  user,
  closeDialog,
}: AvatarSelectorDialogProps) {
  const [selectedAvatarType, setSelectedAvatarType] = useState<string>(
    user?.avatar_type || AVATAR_TYPES[0]
  );
  const { updateAvatar } = UseAuthStore();

  const handleSaveAvatar = async () => {
    const success = await updateAvatar(selectedAvatarType);
    if (success) {
      closeDialog();
    }
  };

  return (
    <DialogContent showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>Select your avatar icon</DialogTitle>
        <DialogDescription>
          Choose an avatar style for your profile.
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-4 py-4">
        {AVATAR_TYPES.map((type) => (
          <button
            key={type}
            className={`flex flex-col items-center gap-2 rounded-lg border p-2 transition-colors ${
              selectedAvatarType === type
                ? "border-primary bg-primary/10"
                : "border-muted"
            }`}
            onClick={() => setSelectedAvatarType(type)}
            type="button"
          >
            <AppAvatarUser
              name={user?.name}
              username={user?.username}
              avatarType={type}
            />
            <span className="text-xs capitalize">{type}</span>
          </button>
        ))}
      </div>

      <DialogFooter>
        <Button variant="outline" size="sm" onClick={closeDialog}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSaveAvatar}>
          {"Save"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
