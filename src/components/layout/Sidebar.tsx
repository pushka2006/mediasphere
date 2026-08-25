"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Map,
  ShoppingCart,
  Building2,
  Store,
  Palette,
  Sparkles,
  Package,
  Wallet,
  BarChart3,
  Bot,
  FileText,
  UserCog,
  Settings,
  ChevronDown,
  ChevronRight,
  Zap,
  Radio,
  Layers,
} from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Campaigns", href: "/campaigns", icon: Megaphone },
  {
    label: "Media Planning",
    icon: Map,
    children: [
      { label: "AI Planner", href: "/ai-planner", icon: Bot, badge: "NEW", badgeColor: "bg-brand-600" },
      { label: "GIS Map View", href: "/media-planning", icon: Map },
    ],
  },
  { label: "Media Buying", href: "/media-buying", icon: ShoppingCart },
  {
    label: "OOH Media",
    icon: Building2,
    children: [
      { label: "All Assets", href: "/ooh-media", icon: Layers },
      { label: "Billboards", href: "/ooh-media?type=BILLBOARD", icon: Building2 },
      { label: "Digital Screens", href: "/ooh-media?type=DIGITAL_LED", icon: Radio },
      { label: "Transit Media", href: "/ooh-media?type=TRANSIT", icon: Radio },
    ],
  },
  { label: "Mall Media", href: "/mall-media", icon: Store },
  { label: "Retail Branding", href: "/retail-branding", icon: Palette },
  { label: "Activations", href: "/activations", icon: Zap },
  { label: "Experiential", href: "/experiential", icon: Sparkles },
  { label: "Vendors", href: "/vendors", icon: Users },
  { label: "Inventory", href: "/inventory", icon: Package },
  { label: "Finance", href: "/finance", icon: Wallet },
  { label: "Reports & Analytics", href: "/analytics", icon: BarChart3 },
  { label: "AI Planner", href: "/ai-planner", icon: Bot, badge: "NEW", badgeColor: "bg-brand-600" },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Users & Roles", href: "/users", icon: UserCog },
  { label: "Settings", href: "/settings", icon: Settings },
];

// Simplified nav for display (no duplicates)
const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Campaigns", href: "/campaigns", icon: Megaphone },
  {
    label: "Media Planning",
    icon: Map,
    children: [
      { label: "AI Planner", href: "/ai-planner", icon: Bot, badge: "NEW", badgeColor: "bg-brand-600" },
      { label: "Map View", href: "/media-planning", icon: Map },
    ],
  },
  { label: "Media Buying", href: "/media-buying", icon: ShoppingCart },
  {
    label: "OOH Media",
    icon: Building2,
    children: [
      { label: "All Assets", href: "/ooh-media", icon: Layers },
      { label: "Digital Screens", href: "/ooh-media?type=DIGITAL_LED", icon: Radio },
    ],
  },
  { label: "Mall Media", href: "/mall-media", icon: Store },
  { label: "Retail Branding", href: "/retail-branding", icon: Palette },
  { label: "Activations", href: "/activations", icon: Zap },
  { label: "Experiential", href: "/experiential", icon: Sparkles },
  { label: "Vendors", href: "/vendors", icon: Users },
  { label: "Inventory", href: "/inventory", icon: Package },
  { label: "Finance", href: "/finance", icon: Wallet },
  { label: "Reports & Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Users & Roles", href: "/users", icon: UserCog },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface NavItemProps {
  item: NavItem;
  depth?: number;
  collapsed?: boolean;
}

function NavItemComponent({ item, depth = 0, collapsed = false }: NavItemProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => {
    if (!item.children) return false;
    return item.children.some((child) => child.href && pathname.startsWith(child.href));
  });

  const isActive = item.href
    ? pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
    : false;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "sidebar-item w-full",
            open && "bg-white/5 text-slate-200"
          )}
        >
          <item.icon size={18} className="shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </>
          )}
        </button>
        {open && !collapsed && (
          <div className="mt-1 ml-4 pl-3 border-l border-white/5 space-y-0.5">
            {item.children.map((child) => (
              <NavItemComponent key={child.label} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={item.href!}>
      <div
        className={cn(
          "sidebar-item",
          isActive && "active",
          depth > 0 && "py-2 text-xs"
        )}
      >
        <item.icon size={depth > 0 ? 15 : 18} className="shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white leading-none",
                  item.badgeColor || "bg-brand-600"
                )}
              >
                {item.badge}
              </span>
            )}
          </>
        )}
      </div>
    </Link>
  );
}

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen z-50 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        "bg-gradient-to-b from-[#0c1220] to-[#080e1a]",
        "border-r border-white/[0.06]"
      )}
      style={{ boxShadow: "4px 0 24px rgba(0,0,0,0.4)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/[0.06] shrink-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            boxShadow: "0 0 20px rgba(99,102,241,0.4)",
          }}
        >
          <span className="text-white font-black text-sm">M</span>
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-extrabold text-white leading-none tracking-tight">
              MEDIASPHERE
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-medium tracking-widest uppercase">
              AI Platform
            </div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-hide">
        {mainNav.map((item) => (
          <NavItemComponent key={item.label} item={item} collapsed={collapsed} />
        ))}
      </div>

      {/* User Profile */}
      <div className="px-2 py-3 border-t border-white/[0.06] shrink-0">
        <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
          <div
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            P
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-200 truncate">Pushkar</div>
              <div className="text-[11px] text-slate-500 truncate">Super Admin</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
