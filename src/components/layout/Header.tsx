"use client";

import { useState } from "react";
import {
  Bell,
  Mail,
  Calendar,
  Search,
  Zap,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  Plus,
  Megaphone,
  Users,
  FileText,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeaderProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const quickActions = [
  { label: "New Campaign", href: "/campaigns/new", icon: Megaphone, color: "#6366f1" },
  { label: "Add Client", href: "/clients/new", icon: Users, color: "#10b981" },
  { label: "New Proposal", href: "/documents?type=proposal", icon: FileText, color: "#a855f7" },
  { label: "Add Media Asset", href: "/ooh-media/new", icon: Building2, color: "#06b6d4" },
];

const notifications = [
  {
    id: "n1",
    title: "Campaign Approved",
    message: "Coca-Cola Summer Blast has been approved",
    time: "2m ago",
    read: false,
    type: "success",
  },
  {
    id: "n2",
    title: "Invoice Overdue",
    message: "INV-2024-003 is overdue by 7 days",
    time: "1h ago",
    read: false,
    type: "warning",
  },
  {
    id: "n3",
    title: "New Client Added",
    message: "Zomato Ltd. added as new client",
    time: "2h ago",
    read: true,
    type: "info",
  },
  {
    id: "n4",
    title: "Vendor Contract Expiry",
    message: "Rajesh Outdoor contract expires in 15 days",
    time: "5h ago",
    read: true,
    type: "warning",
  },
];

export default function Header({ sidebarCollapsed, onToggleSidebar }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className="fixed top-0 right-0 z-40 h-16 flex items-center px-4 gap-3 transition-all duration-300"
      style={{
        left: sidebarCollapsed ? "64px" : "256px",
        background: "rgba(8, 14, 26, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Sidebar Toggle */}
      <button
        onClick={onToggleSidebar}
        className="btn-ghost p-2"
        aria-label="Toggle sidebar"
      >
        {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            placeholder="Search campaigns, locations, clients, media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-20 py-2 rounded-xl text-sm bg-white/5 border border-white/08 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-brand-500/50 focus:bg-white/8 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 bg-white/5 rounded border border-white/08">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 ml-auto">

        {/* Quick Create */}
        <div className="relative">
          <button
            onClick={() => {
              setShowQuickCreate(!showQuickCreate);
              setShowNotifications(false);
              setShowUserMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
            }}
          >
            <Zap size={15} />
            <span className="hidden md:block">Quick Create</span>
          </button>

          {showQuickCreate && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden z-50"
              style={{
                background: "rgba(12, 18, 32, 0.97)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div className="p-3 border-b border-white/08">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Quick Create
                </p>
              </div>
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  onClick={() => setShowQuickCreate(false)}
                >
                  <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/05 transition-colors">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: `${action.color}25` }}
                    >
                      <action.icon size={14} style={{ color: action.color }} />
                    </div>
                    <span className="text-sm text-slate-300">{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowQuickCreate(false);
              setShowUserMenu(false);
            }}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/08 transition-colors text-slate-400 hover:text-slate-200"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-2xl overflow-hidden z-50"
              style={{
                background: "rgba(12, 18, 32, 0.97)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/08">
                <p className="text-sm font-bold text-slate-200">Notifications</p>
                <span className="badge badge-brand">{unreadCount} new</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "flex gap-3 px-4 py-3 hover:bg-white/03 transition-colors border-b border-white/04 last:border-0",
                      !n.read && "bg-brand-500/05"
                    )}
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mt-1.5 shrink-0",
                        n.type === "success" && "bg-emerald-500",
                        n.type === "warning" && "bg-amber-500",
                        n.type === "info" && "bg-blue-500"
                      )}
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{n.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                      <p className="text-[11px] text-slate-600 mt-1">{n.time}</p>
                    </div>
                    {!n.read && (
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-white/08">
                <button className="w-full text-center text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mail */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/08 transition-colors text-slate-400 hover:text-slate-200">
          <Mail size={18} />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand-500 text-[10px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* Calendar */}
        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/08 transition-colors text-slate-400 hover:text-slate-200">
          <Calendar size={18} />
        </button>

        {/* User Menu */}
        <div className="relative ml-1">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
              setShowQuickCreate(false);
            }}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-white/08 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
            >
              P
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-slate-200 leading-none">Pushkar</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Super Admin</div>
            </div>
            <ChevronDown size={14} className="text-slate-500 hidden md:block" />
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-2xl overflow-hidden z-50"
              style={{
                background: "rgba(12, 18, 32, 0.97)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div className="p-3 border-b border-white/08">
                <p className="text-sm font-semibold text-slate-200">Pushkar</p>
                <p className="text-xs text-slate-500">pushkar@mediasphere.in</p>
              </div>
              {[
                { label: "My Profile", icon: User, href: "/profile" },
                { label: "Settings", icon: Settings, href: "/settings" },
              ].map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setShowUserMenu(false)}>
                  <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/05 transition-colors">
                    <item.icon size={15} className="text-slate-400" />
                    <span className="text-sm text-slate-300">{item.label}</span>
                  </div>
                </Link>
              ))}
              <div className="border-t border-white/08">
                <button className="flex items-center gap-3 px-3 py-2.5 w-full hover:bg-red-500/10 transition-colors text-red-400">
                  <LogOut size={15} />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handler */}
      {(showNotifications || showUserMenu || showQuickCreate) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
            setShowQuickCreate(false);
          }}
        />
      )}
    </header>
  );
}
