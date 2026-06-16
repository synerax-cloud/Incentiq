"use client";

import { useEffect, useState, useCallback } from "react";
import { Header } from "@/components/admin/Header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Download, Trash2, Eye } from "lucide-react";
import { formatDateTime, exportToCSV } from "@/lib/utils";
import Link from "next/link";

interface DemoRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle?: string;
  companySize?: string;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = ["ALL", "NEW", "CONTACTED", "QUALIFIED", "SCHEDULED", "CLOSED"];
const STATUS_COLORS: Record<string, "success" | "warning" | "accent" | "secondary" | "destructive"> = {
  NEW: "accent",
  CONTACTED: "warning",
  QUALIFIED: "success",
  SCHEDULED: "success",
  CLOSED: "secondary",
};

export default function DemoRequestsPage() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ search, limit: "50" });
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    const res = await fetch(`/api/admin/demo-requests?${params}`);
    if (res.ok) {
      const data = await res.json();
      setRequests(data.data);
      setTotal(data.total);
    }
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`/api/admin/demo-requests/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    fetchRequests();
  }

  async function handleStatusChange(id: string, status: string) {
    await fetch(`/api/admin/demo-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchRequests();
  }

  function handleExport() {
    exportToCSV(
      requests.map((r) => ({
        Name: `${r.firstName} ${r.lastName}`,
        Email: r.email,
        Company: r.company,
        "Job Title": r.jobTitle ?? "",
        "Company Size": r.companySize ?? "",
        Status: r.status,
        Date: formatDateTime(r.createdAt),
      })),
      "demo-requests"
    );
  }

  return (
    <div className="flex flex-col">
      <Header title="Demo Requests" />
      <div className="p-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s === "ALL" ? "All statuses" : s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        <p className="text-xs text-gray-500">{total} total requests</p>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-gray-400">Loading…</TableCell>
                </TableRow>
              )}
              {!loading && !requests.length && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-gray-400">No requests found.</TableCell>
                </TableRow>
              )}
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{req.firstName} {req.lastName}</p>
                      <p className="text-xs text-gray-500">{req.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-gray-700">{req.company}</p>
                    {req.jobTitle && <p className="text-xs text-gray-500">{req.jobTitle}</p>}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">{req.companySize ?? "—"}</TableCell>
                  <TableCell>
                    <Select value={req.status} onValueChange={(v) => handleStatusChange(req.id, v)}>
                      <SelectTrigger className="h-7 w-32 border-0 bg-transparent p-0 shadow-none focus:ring-0 text-xs">
                        <Badge variant={STATUS_COLORS[req.status] ?? "secondary"}>{req.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.filter((s) => s !== "ALL").map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-gray-500 text-xs">{formatDateTime(req.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/demo-requests/${req.id}`}
                        className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={() => setDeleteId(req.id)}
                            className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete request?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the demo request from {req.firstName} {req.lastName}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
