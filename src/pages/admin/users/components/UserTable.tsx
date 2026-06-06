import { MoreVertical, Trash2, Lock, Unlock } from "lucide-react";
import { type UserProfile } from "./types";

interface UserTableProps {
  users: UserProfile[];
  activeDropdownId: string | null;
  onToggleDropdown: (id: string | null) => void;
  onToggleStatusClick: (user: UserProfile) => void;
  onDeleteClick: (user: UserProfile) => void;
  isLoading?: boolean;
}

export default function UserTable({
  users,
  activeDropdownId,
  onToggleDropdown,
  onToggleStatusClick,
  onDeleteClick,
  isLoading = false,
}: UserTableProps) {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-left border-collapse min-w-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
            <th className="px-6 py-4">User Info</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Created Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                Loading users...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-blue-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatarUrl}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${
                      user.role === "Employer"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-purple-50 text-purple-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.createdAt}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      user.status === "Active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-green-600" : "bg-red-600"}`}
                    ></span>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right relative">
                  <button
                    onClick={() =>
                      onToggleDropdown(
                        activeDropdownId === user.id ? null : user.id,
                      )
                    }
                    className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors inline-flex"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {activeDropdownId === user.id && (
                    <div className="absolute right-6 top-10 mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-20 animate-in zoom-in-95 ">
                      <button
                        onClick={() => {
                          onToggleDropdown(null);
                          onToggleStatusClick(user);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {user.status === "Active" ? (
                          <>
                            <Lock size={16} /> Lock Account
                          </>
                        ) : (
                          <>
                            {" "}
                            <Unlock size={16} /> Unlock Account
                          </>
                        )}
                      </button>
                      <div className="h-px bg-gray-100 my-1"></div>

                      <button
                        onClick={() => {
                          onToggleDropdown(null);
                          onDeleteClick(user);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} /> Deactivate Account
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
