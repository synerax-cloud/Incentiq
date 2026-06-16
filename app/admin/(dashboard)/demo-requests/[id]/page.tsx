"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/admin/Header";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Mail, Building, User, Calendar } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

interface DemoRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle?: string;
  country?: string;
  companySize?: string;
  message?: string;
  status: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

const STATUS_OPTIONS = ["NEW", "CONTACTED", "QUALIFIED", "SCHEDULED", "CLOSED"];
const STATUS_COLORS: Record<string, "success" | "warning" | "accent" | "secondary"> = {
  NEW: "accent",
  CONTACTED: "warning",
  QUALIFIED: "success",
  SCHEDULED: "success",
  CLOSED: "secondary",
};

export default function DemoRequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<DemoRequest | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/demo-requests/${id}`)
      .then((r) => r.ok ? r.json() : null)
      .then((d) => d && setRequest(d));
  }, [id]);

  async function handleStatusChange(status: string) {
    setSaving(true);
    const res = await fetch(`/api/admin/demo-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) setRequest(await res.json());
    setSaving(false);
  }

  if (!request) {
    return (
      <div className="flex flex-col">
        <Header title="Demo Request" />
        <div className="p-6 flex h-64 items-center justify-center text-gray-400">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header title="Demo Request Detail" />
      <div className="p-6 space-y-6 max-w-3xl">
        <Link
          href="/admin/demo-requests"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to requests
        </Link>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-start justify-between border-b border-gray-200 p-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {request.firstName} {request.lastName}
              </h2>
              <p className="text-sm text-gray-500">{request.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={request.status} onValueChange={handleStatusChange} disabled={saving}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant={STATUS_COLORS[request.status] ?? "secondary"}>
                {request.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-5">
            <InfoRow icon={Building} label="Company" value={request.company} />
            <InfoRow icon={User} label="Job Title" value={request.jobTitle ?? "—"} />
            <InfoRow icon={Mail} label="Email" value={request.email} />
            {request.phone && <InfoRow icon={User} label="Phone" value={request.phone} />}
            {request.country && <InfoRow icon={User} label="Country" value={request.country} />}
            {request.companySize && <InfoRow icon={User} label="Company Size" value={request.companySize} />}
            {request.source && <InfoRow icon={User} label="Source" value={request.source} />}
            <InfoRow icon={Calendar} label="Submitted" value={formatDateTime(request.createdAt)} />
          </div>

          {request.message && (
            <div className="border-t border-gray-200 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Message</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{request.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm text-gray-800">{value}</p>
      </div>
    </div>
  );
}
