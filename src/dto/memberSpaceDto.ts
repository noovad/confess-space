export interface MemberSpaceDto {
  id: string;
  userId: string;
  spaceId: string;
  role: "admin" | "member";
  joinedAt: string;
}
