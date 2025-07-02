"use client";

import { useMessageStore } from "@/app/store/useMessageStore";
import { AppAvatarUser } from "@/components/app-avatar-user/AppAvatarUser";

export default function OnlineUsersSection() {
  const activeUsers = useMessageStore((state) => state.activeUsers);
  return (
    <div className="bg-background p-4 h-full">
      <div className="flex flex-row items-center gap-2">
        <h1 className=" text-black min-w-0 truncate font-semibold tracking-tight">
          Users Online
        </h1>
      </div>
      <hr className="mb-4 border-black border-t-2" />
      <ul role="list" className="divide-y divide-gray-100">
        {activeUsers.length === 0 ? (
          <li key="no-users" className="py-2 text-center text-gray-500">
            No users online
          </li>
        ) : (
          activeUsers.map((user) => (
            <li key={user.email} className="flex justify-between gap-x-6 py-2">
              <div className="flex gap-x-4 items-center">
                <AppAvatarUser
                  name={user.name}
                  username={user.username}
                  avatarType={user.avatar_type}
                />
                <div className="flex-auto hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
