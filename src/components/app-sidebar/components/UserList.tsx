import { AppAvatarUser } from "@/components/app-avatar-user/AppAvatarUser";
import { onlineUsers } from "@/data/onlineUsers";

export function UserList() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {onlineUsers.length === 0 ? (
        <li className="py-2 text-center text-gray-500">No users online</li>
      ) : (
        onlineUsers.map((user) => (
          <li key={user.email} className="flex justify-between gap-x-6 py-2">
            <div className="flex gap-x-4">
              <AppAvatarUser
                name={user.name}
                username={user.username}
                avatarType={user.avatarType}
              />
              <div className="flex-auto">
                <p className="text-sm/6 truncate font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="truncate text-xs/5 text-gray-500">
                  {user.username}
                </p>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
