import type { ContactRecord, LineOARecord, PrototypeNotification, SegmentRecord } from "@/types";

export const lineOaSeed: LineOARecord[] = [
  { id: "oa-1", name: "BOLA Fashion", handle: "@bolafashion", status: "active", followers: 18420 },
  { id: "oa-2", name: "BOLA Beauty", handle: "@bolabeauty", status: "active", followers: 12640 },
  { id: "oa-3", name: "BOLA VIP", handle: "@bolavip", status: "inactive", followers: 8900 },
];

export const contactSeed: ContactRecord[] = Array.from({ length: 32 }).map((_, index) => {
  const segmentTag = index % 3 === 0 ? "VIP" : index % 2 === 0 ? "Broadcast" : "New";
  return {
    id: `contact-${index + 1}`,
    displayName: `Customer ${index + 1}`,
    lineUserId: `U00${index + 1001}`,
    phone: index % 4 === 0 ? `08${(index + 11).toString().padStart(8, "0")}` : undefined,
    email: `customer${index + 1}@bola.local`,
    tags: [segmentTag],
    lineOaId: lineOaSeed[index % lineOaSeed.length].id,
  };
});

export const segmentSeed: SegmentRecord[] = [
  {
    id: "seg-1",
    name: "VIP Shoppers",
    description: "Followers with high-value purchases and repeat orders.",
    color: "success",
    memberCount: 128,
    ruleSummary: "Tag = VIP and last purchase within 90 days",
  },
  {
    id: "seg-2",
    name: "Broadcast Warm Leads",
    description: "Followers who interacted with recent promotional broadcasts.",
    color: "warning",
    memberCount: 246,
    ruleSummary: "Clicked broadcast in last 30 days",
  },
  {
    id: "seg-3",
    name: "New Registration",
    description: "New contacts from registration forms waiting for nurture flow.",
    color: "secondary",
    memberCount: 74,
    ruleSummary: "Joined in last 14 days",
  },
];

export const notificationSeed: PrototypeNotification[] = [
  {
    id: "notif-1",
    title: "Segment draft ready",
    message: "VIP Shoppers rule set was updated in the prototype workspace.",
    time: "2m ago",
    read: false,
  },
  {
    id: "notif-2",
    title: "LINE OA connected",
    message: "BOLA Beauty is now active and available for broadcasts.",
    time: "10m ago",
    read: false,
  },
  {
    id: "notif-3",
    title: "Dashboard refreshed",
    message: "Prototype stats were recalculated from the current mock data.",
    time: "1h ago",
    read: true,
  },
];
