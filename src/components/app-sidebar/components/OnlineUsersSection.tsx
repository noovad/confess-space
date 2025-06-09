import onlineUsers from "@/data/onlineUsers";
import { UserList } from "./UserList";
import { Badge } from "@/components/ui/badge";

export default async function OnlineUsersSection() {
  return (
    <div className="bg-background p-4">
      <div className="flex flex-row items-center gap-2">
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
          {onlineUsers.length}
        </Badge>
        <h1 className="text-lg min-w-0 truncate font-semibold tracking-tight">
          Users Online
        </h1>
      </div>
      <hr className="mb-4 border-black border-t-2" />
      <UserList />
    </div>
  );
}
