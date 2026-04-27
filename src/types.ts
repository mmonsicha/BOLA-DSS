import type { ReactNode } from "react";

export type RouteKey = "dashboard" | "line-oa" | "contacts" | "segments";

export interface NavItem {
  id: RouteKey;
  label: string;
  icon?: ReactNode;
}

export interface LineOARecord {
  id: string;
  name: string;
  handle: string;
  status: "active" | "inactive";
  followers: number;
}

export interface ContactRecord {
  id: string;
  displayName: string;
  lineUserId: string;
  phone?: string;
  email?: string;
  tags: string[];
  lineOaId: string;
}

export interface SegmentRecord {
  id: string;
  name: string;
  description: string;
  color: "default" | "secondary" | "success" | "warning";
  memberCount: number;
  ruleSummary: string;
}

export interface PrototypeNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}
