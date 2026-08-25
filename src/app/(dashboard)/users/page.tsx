"use client";

import { mockUsers } from "@/lib/mockData";
import { UserCog, Plus, ShieldCheck } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <UserCog className="text-brand-400" size={26} />
            Users & Role-Based Access Control (RBAC)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage agency team members, permissions, access roles & audit history
          </p>
        </div>
        <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
          <Plus size={15} />
          <span>Invite User</span>
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email Address</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((u) => (
              <tr key={u.id}>
                <td className="font-bold text-white flex items-center gap-3">
                  <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full border border-white/10" />
                  <span>{u.name}</span>
                </td>
                <td className="text-slate-300">{u.email}</td>
                <td className="text-xs text-slate-400">{u.department}</td>
                <td>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300">
                    {u.role.replace("_", " ")}
                  </span>
                </td>
                <td>
                  <span className="badge badge-active">Active</span>
                </td>
                <td>
                  <button className="btn-secondary text-xs py-1 px-3">Edit Role</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
