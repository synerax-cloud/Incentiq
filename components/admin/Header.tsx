"use client";

import { signOut, useSession } from "next-auth/react";
import { Bell, LogOut, Settings, ChevronDown } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { data: session } = useSession();
  const name     = session?.user?.name ?? "Admin";
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-light-gray bg-white px-6 shadow-[0_1px_4px_rgba(11,29,45,0.04)]">
      {/* Left — title */}
      <div className="flex items-baseline gap-2.5">
        <h1 className="text-[15px] font-bold text-dark-green">{title}</h1>
        {subtitle && (
          <>
            <span className="text-light-gray">/</span>
            <span className="text-[13px] text-slate">{subtitle}</span>
          </>
        )}
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <button className="relative rounded-lg p-2 text-slate transition-colors hover:bg-white hover:text-navy">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-green ring-2 ring-panel" />
        </button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex items-center gap-2 rounded-xl border border-transparent px-2.5 py-1.5 transition-all hover:border-light-gray hover:bg-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-green to-dark-green text-[11px] font-bold text-white ring-1 ring-green/20">
                {initials}
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-[12.5px] font-semibold leading-none text-dark-green">{name}</p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52 rounded-xl border-light-gray bg-white p-1 shadow-float">
            <DropdownMenuLabel className="px-3 py-2">
              <p className="text-[12.5px] font-semibold text-dark-green">{name}</p>
              <p className="text-[11px] text-slate">{session?.user?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-light-gray" />
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2 text-[13px] text-navy focus:bg-white focus:text-dark-green">
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4 text-slate" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-light-gray" />
            <DropdownMenuItem
              className="cursor-pointer rounded-lg px-3 py-2 text-[13px] text-red focus:bg-red/10 focus:text-red"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
