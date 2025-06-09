import { Badge } from "@/components/ui/badge";
import { onlineUsers } from "@/data/onlineUsers";
import { UserList } from "./UserList";

export default async function OnlineUsersSection() {
  return (
    <div className="bg-background p-4 h-full">
      <div className="flex flex-row items-center gap-2">
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-black text-white">
          {onlineUsers.length}
        </Badge>
        <h1 className=" text-black min-w-0 truncate font-semibold tracking-tight">
          Users Online
        </h1>
      </div>
      <hr className="mb-4 border-black border-t-2" />
      <UserList />
    </div>
  );
}
