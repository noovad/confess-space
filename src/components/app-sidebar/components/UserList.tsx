import onlineUsers from "@/data/onlineUsers";
import { getAvatar } from "@/utils/avatar-utils";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export function UserList() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {onlineUsers.length === 0 ? (
        <li className="py-2 text-center text-gray-500">No users online</li>
      ) : (
        onlineUsers.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-2">
            <div className="flex gap-x-4">
              <Avatar className="shrink-0">
                <AvatarImage
                  src={getAvatar(person.username, person.avatarType)}
                  alt={person.name}
                  className="rounded-full size-12"
                />
              </Avatar>
              <div className="flex-auto">
                <p className="text-sm/6 truncate font-semibold text-gray-900">
                  {person.name}
                </p>
                <p className="truncate text-xs/5 text-gray-500">
                  {person.username}
                </p>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
