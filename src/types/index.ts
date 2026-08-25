// ─── Enums ────────────────────────────────────────────────────────────────────

export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "CAMPAIGN_MANAGER"
  | "MEDIA_PLANNER"
  | "MEDIA_BUYER"
  | "FINANCE_MANAGER"
  | "VENDOR"
  | "INSTALLATION_TEAM"
  | "CREATIVE_TEAM"
  | "MARKETING_TEAM"
  | "CLIENT";

export type CampaignStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "ACTIVE"
  | "COMPLETED"
  | "ON_HOLD"
  | "CANCELLED";

export type CampaignType =
  | "OOH"
  | "MALL_MEDIA"
  | "RETAIL_BRANDING"
  | "TRANSIT"
  | "EXPERIENTIAL"
  | "DIGITAL"
  | "MIXED";

export type MediaType =
  | "BILLBOARD"
  | "UNIPOLE"
  | "GANTRY"
  | "BUS_SHELTER"
  | "METRO_PANEL"
  | "AIRPORT"
  | "RAILWAY"
  | "DIGITAL_LED"
  | "TRANSIT"
  | "STREET_FURNITURE"
  | "WALL_WRAP"
  | "BUILDING_WRAP"
  | "DIGITAL_SCREEN"
  | "MALL_ATRIUM"
  | "MALL_LED_WALL"
  | "MALL_KIOSK"
  | "RETAIL_STORE";

export type ClientStatus = "LEAD" | "PROSPECT" | "ACTIVE" | "INACTIVE" | "CHURNED";
export type ClientSegment = "ENTERPRISE" | "MID_MARKET" | "SME" | "STARTUP" | "GOVERNMENT" | "NGO";
export type VendorType = "MEDIA_OWNER" | "PRINTER" | "FABRICATOR" | "INSTALLATION" | "ELECTRICIAN" | "TRANSPORT" | "EVENT_AGENCY";
export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE" | "CANCELLED";

// ─── Core Entities ────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  department?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  industry?: string;
  segment: ClientSegment;
  status: ClientStatus;
  rating: number;
  avatar?: string;
  totalRevenue: number;
  manager?: User;
  createdAt: string;
  updatedAt: string;
  _count?: {
    campaigns: number;
    invoices: number;
  };
}

export interface Campaign {
  id: string;
  name: string;
  client: Client;
  clientId: string;
  status: CampaignStatus;
  type: CampaignType;
  objective?: string;
  description?: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  cities: string[];
  industry?: string;
  targetReach?: number;
  actualReach?: number;
  impressions?: number;
  roi?: number;
  createdAt: string;
  updatedAt: string;
  owner?: User;
  _count?: {
    items: number;
  };
}

export interface MediaAsset {
  id: string;
  name: string;
  type: MediaType;
  subType?: string;
  vendor?: Vendor;
  vendorId?: string;
  city: string;
  state?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  width?: number;
  height?: number;
  facing?: string;
  illumination?: string;
  trafficCount?: number;
  monthlyReach?: number;
  monthlyRate: number;
  isAvailable: boolean;
  photos?: string[];
  status: "ACTIVE" | "MAINTENANCE" | "INACTIVE" | "BOOKED";
  notes?: string;
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  city?: string;
  type: VendorType;
  rating: number;
  totalPaid: number;
  status: "ACTIVE" | "INACTIVE" | "BLACKLISTED";
  createdAt: string;
  _count?: {
    mediaAssets: number;
    purchaseOrders: number;
  };
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  client: Client;
  clientId: string;
  campaign?: Campaign;
  amount: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  dueDate?: string;
  paidDate?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: User;
  creator?: User;
  client?: Client;
  campaign?: Campaign;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  minStock: number;
  rate: number;
  vendor?: string;
  warehouse?: string;
  image?: string;
  brand?: string;
  createdAt: string;
}

// ─── Analytics Types ──────────────────────────────────────────────────────────

export interface KPIData {
  label: string;
  value: string | number;
  change: number;
  changeType: "up" | "down" | "neutral";
  icon: string;
  color: string;
  subValue?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface MapMarker {
  id: string;
  name: string;
  type: MediaType;
  lat: number;
  lng: number;
  city: string;
  rate: number;
  isAvailable: boolean;
  status: string;
}

// ─── AI Planner Types ─────────────────────────────────────────────────────────

export interface AIRecommendation {
  bestCity: {
    name: string;
    expectedReach: string;
    reason: string;
  };
  bestMediaMix: {
    mix: string;
    expectedRoi: string;
    reason: string;
  };
  budgetOptimization: {
    saving: string;
    strategy: string;
  };
  duration: {
    optimal: string;
    reason: string;
  };
  locations: Array<{
    id: string;
    name: string;
    type: string;
    city: string;
    reach: number;
    rate: number;
    score: number;
  }>;
  forecast: {
    reach: number;
    impressions: number;
    frequency: number;
    roi: number;
  };
}

export interface PlannerInput {
  budget: number;
  duration: number;
  cities: string[];
  audience: string;
  industry: string;
  objective: string;
  mediaTypes: string[];
}
