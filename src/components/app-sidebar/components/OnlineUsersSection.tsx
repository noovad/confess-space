import { Users } from "lucide-react";
import { UserList } from "./UserList";

export default async function OnlineUsersSection() {
  return (
    <div className="bg-background p-4">
      <div className="flex flex-row items-center gap-2">
        <Users className="size-4 shrink-0 fill-black" />
        <h1 className="text-lg min-w-0 truncate font-semibold tracking-tight">Users Online</h1>
      </div>
      <hr className="mb-4 border-black border-t-2" />
      <UserList />
    </div>
  );
}
