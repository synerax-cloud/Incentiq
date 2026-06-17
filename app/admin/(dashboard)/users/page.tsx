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
        <p className="text-sm text-slate">Manage admin users.</p>

        <div className="rounded-xl border border-light-gray bg-white shadow-soft overflow-hidden">
          <div className="border-b border-light-gray bg-light-gray/40 px-5 py-3">
            <p className="text-sm font-semibold text-dark-green">Admin Users</p>
          </div>
          <div className="divide-y divide-light-gray">
            {session?.user && (
              <div className="flex items-center gap-4 px-5 py-4 hover:bg-light-gray/30 transition-colors">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-green text-white text-sm">
                    {session.user.name?.[0]?.toUpperCase() ?? "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-dark-green">{session.user.name}</p>
                  <p className="text-xs text-slate">{session.user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-green" />
                  <Badge variant="accent">ADMIN</Badge>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-light-gray bg-white p-5 shadow-soft">
          <p className="text-sm text-slate mb-2">Add users via the database seed script.</p>
          <code className="text-xs text-green bg-light-green px-2 py-1 rounded border border-light-green">npm run db:seed</code>
        </div>
      </div>
    </div>
  );
}
