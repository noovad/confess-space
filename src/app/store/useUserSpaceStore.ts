import { create } from 'zustand';
import { SpaceDto } from '@/dto/spaceDto';
import axiosApp from '@/lib/axiosApp';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface UserSpaceStore {
    userSpaces: SpaceDto[];
    space: SpaceDto | null;
    isMemberOf: boolean;
    fetchUserSpaces: (spaceId: string, userId: string) => Promise<boolean>;
    checkUserInSpace: (spaceId: string, userId: string) => Promise<boolean>;
    joinToSpace: (spaceId: string, userId: string) => Promise<boolean>;
    leaveFromSpace: (spaceId: string) => Promise<boolean>;
}

export const useUserSpaceStore = create<UserSpaceStore & {
    availableSpaces?: SpaceDto[];
    loading?: boolean;
    fetchAvailableSpaces?: () => Promise<boolean>;
}>((set) => ({
    userSpaces: [],
    space: null,
    isMemberOf: false,

    fetchUserSpaces: async (spaceId, userId) => {
        try {
            if (!userId && !spaceId) {
                toast.error('User ID atau Space ID harus diisi.');
                return false;
            }
            let query = '';
            if (userId && spaceId) {
                query = `?userId=${userId}&spaceId=${spaceId}`;
            } else if (userId) {
                query = `?userId=${userId}`;
            } else if (spaceId) {
                query = `?spaceId=${spaceId}`;
            }
            const response = await axiosApp.get(`/user-space${query}`);
            const spaces = response.data.data.map((item: { space: SpaceDto }) => item.space) as SpaceDto[];
            set({ userSpaces: spaces });
            return true;
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(
                    error instanceof AxiosError ? error.message : String(error)
                );
            }
            return false;
        }
    },

    checkUserInSpace: async (spaceId: string, userId: string) => {
        try {
            const response = await axiosApp.get(`user-space/check/${spaceId}/${userId}`);
            set({ isMemberOf: response.data.data });
            return true;
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(
                    error instanceof AxiosError ? error.message : String(error)
                );
            }
            return false;
        }
    },

    joinToSpace: async (spaceId: string, userId: string) => {
        try {
            await axiosApp.post(`user-space`, { space_id: spaceId, user_id: userId });
            toast.success('You have joined the space successfully.');
            return true;
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(
                    error instanceof AxiosError ? error.message : String(error)
                );
            }
            return false;
        }
    },

    leaveFromSpace: async (spaceId: string) => {
        try {
            await axiosApp.delete(`user-space/${spaceId}`);
            toast.success('You have left the space successfully.');
            return true;
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(
                    error instanceof AxiosError ? error.message : String(error)
                );
            }
            return false;
        }
    },

}));
