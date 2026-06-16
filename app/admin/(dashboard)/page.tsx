"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, FileText, Image, Users } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { Header } from "@/components/admin/Header";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";

interface Stats {
  totalDemoRequests: number;
  newDemoRequests: number;
  totalPosts: number;
  publishedPosts: number;
  totalMedia: number;
  recentDemos: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    status: string;
    createdAt: string;
  }>;
}

const STATUS_COLORS: Record<string, "success" | "warning" | "accent" | "secondary" | "destructive"> = {
  NEW: "accent",
  CONTACTED: "warning",
  QUALIFIED: "success",
  SCHEDULED: "success",
  CLOSED: "secondary",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setStats(data); })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col">
      <Header title="Dashboard" />
      <div className="p-6 space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatsCard
            title="Demo Requests"
            value={stats?.totalDemoRequests ?? "—"}
            subtitle={`${stats?.newDemoRequests ?? 0} new`}
            icon={CalendarCheck}
          />
          <StatsCard
            title="Blog Posts"
            value={stats?.totalPosts ?? "—"}
            subtitle={`${stats?.publishedPosts ?? 0} published`}
            icon={FileText}
          />
          <StatsCard
            title="Media Files"
            value={stats?.totalMedia ?? "—"}
            icon={Image}
          />
          <StatsCard
            title="Team"
            value="1"
            subtitle="Admin users"
            icon={Users}
          />
        </div>

        {/* Recent demo requests */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-900">Recent Demo Requests</h2>
            <a href="/admin/demo-requests" className="text-xs text-[#2B4A7F] hover:underline font-medium">View all</a>
          </div>
          <div className="divide-y divide-gray-100">
            {!stats?.recentDemos?.length && (
              <p className="px-5 py-8 text-center text-sm text-gray-400">No requests yet.</p>
            )}
            {stats?.recentDemos.map((req) => (
              <div key={req.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {req.firstName} {req.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{req.company} · {req.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden text-xs text-gray-400 sm:block">
                    {formatDateTime(req.createdAt)}
                  </span>
                  <Badge variant={STATUS_COLORS[req.status] ?? "secondary"}>
                    {req.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
