import { toast } from "sonner";
import { useSpaceStore } from "@/app/store/useSpaceStore";
import { useUserSpaceStore } from "@/app/store/useUserSpaceStore";
import { useMessageStore } from "@/app/store/useMessageStore";
import { UserDto } from "@/dto/userDto";
import { SpaceDto } from "@/dto/spaceDto";

export async function handleSendMessage(
    message: string,
    space: SpaceDto | null,
    user: UserDto | null,
    clearMessageFn: () => void
): Promise<boolean> {
    if (!message.trim() || !space?.id || !user?.id) {
        return false;
    }

    const { addMessage } = useMessageStore.getState();

    try {
        const result = await addMessage(space.id, message.trim(), space.slug);

        clearMessageFn();

        if (!result) {
            toast.error("Failed to send message");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message");
        return false;
    }
}

export async function handleJoinSpace(
    space: SpaceDto | null,
    user: UserDto | null
): Promise<boolean> {
    if (!space?.id || !user?.id) {
        return false;
    }

    const { joinToSpace } = useUserSpaceStore.getState();

    try {
        const result = await joinToSpace(space.id, user.id);

        if (result) {
            await useUserSpaceStore.getState().fetchFollowingSpaces(user.id);
            await useSpaceStore.getState().fetchAvailableSpacesSidebar();
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error joining space:", error);
        return false;
    }
}

export async function handleLeaveSpace(
    space: SpaceDto | null,
    user: UserDto | null
): Promise<boolean> {
    if (!space?.id || !user?.id) {
        return false;
    }

    const { leaveFromSpace } = useUserSpaceStore.getState();

    try {
        const result = await leaveFromSpace(space.id);

        if (result) {
            await useUserSpaceStore.getState().fetchFollowingSpaces(user.id);
            await useSpaceStore.getState().fetchAvailableSpacesSidebar();
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error leaving space:", error);
        return false;
    }
}
