"use client";

import { useSession } from "next-auth/react";
import { Header } from "@/components/admin/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default function UsersPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col">
      <Header title="Users" />
      <div className="p-6 space-y-5">
        <p className="text-sm text-gray-500">Manage admin users.</p>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
            <p className="text-sm font-semibold text-gray-700">Admin Users</p>
          </div>
          <div className="divide-y divide-gray-100">
            {session?.user && (
              <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-[#2B4A7F] text-white text-sm">
                    {session.user.name?.[0]?.toUpperCase() ?? "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-[#2B4A7F]" />
                  <Badge variant="accent">ADMIN</Badge>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Add users via the database seed script.</p>
          <code className="text-xs text-[#2B4A7F] bg-blue-50 px-2 py-1 rounded border border-blue-100">npm run db:seed</code>
        </div>
      </div>
    </div>
  );
}
