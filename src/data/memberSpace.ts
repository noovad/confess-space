import { MemberSpaceDto } from "@/dto/memberSpaceDto";

export const memberSpaces: MemberSpaceDto[] = [
    {
        id: "1",
        userId: "1",
        spaceId: "space-1",
        role: "admin",
        joinedAt: "2023-10-01T12:00:00Z",
    },
    {
        id: "2",
        userId: "2",
        spaceId: "space-1",
        role: "member",
        joinedAt: "2023-10-02T12:00:00Z",
    },
    {
        id: "3",
        userId: "1",
        spaceId: "space-2",
        role: "admin",
        joinedAt: "2023-10-03T12:00:00Z",
    },
    {
        id: "4",
        userId: "2",
        spaceId: "space-2",
        role: "member",
        joinedAt: "2023-10-04T12:00:00Z",
    },
];