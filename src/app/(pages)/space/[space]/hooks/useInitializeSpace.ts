/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserDto } from "@/dto/userDto";
import { getUserFromClientCookie } from "@/utils/getUser";
import { useSpaceStore } from "@/app/store/useSpaceStore";
import { useUserSpaceStore } from "@/app/store/useUserSpaceStore";
import { useMessageStore } from "@/app/store/useMessageStore";

export function useInitializeSpace() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<UserDto | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true);

    const { space, fetchSpaceBySlug } = useSpaceStore();
    const { checkUserInSpace } = useUserSpaceStore();
    const { fetchMessages } = useMessageStore();

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const currentUser = getUserFromClientCookie();
                setUser(currentUser);

                const slug = pathname.split("/")[2];
                if (!slug) {
                    router.push("/");
                    return;
                }

                const spaceFetched = await fetchSpaceBySlug(slug);
                if (!spaceFetched) {
                    router.push("/");
                    return;
                }

                const currentSpace = useSpaceStore.getState().space;
                if (!currentSpace) {
                    router.push("/");
                    return;
                }

                setIsOwner(currentUser?.id === currentSpace.owner_id);

                if (currentUser?.id && currentSpace?.id) {
                    await checkUserInSpace(currentSpace.id, currentUser.id);
                    await fetchMessages(currentSpace.id);
                }
            } catch (error) {
                console.error("Error initializing space:", error);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    return { user, isOwner, loading, space };
}
