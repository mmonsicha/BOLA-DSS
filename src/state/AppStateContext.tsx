import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "@uxuissk/design-system";
import { contactSeed, lineOaSeed, notificationSeed, segmentSeed } from "@/mock/data";
import type { ContactRecord, LineOARecord, PrototypeNotification, SegmentRecord } from "@/types";

interface AppStateValue {
  lineOAs: LineOARecord[];
  contacts: ContactRecord[];
  segments: SegmentRecord[];
  notifications: PrototypeNotification[];
  addLineOA: (payload: { name: string; handle: string }) => void;
  toggleLineOAStatus: (id: string) => void;
  addSegment: (payload: { name: string; description: string; ruleSummary: string }) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [lineOAs, setLineOAs] = useState(lineOaSeed);
  const [contacts] = useState(contactSeed);
  const [segments, setSegments] = useState(segmentSeed);
  const [notifications, setNotifications] = useState(notificationSeed);

  const value = useMemo<AppStateValue>(() => ({
    lineOAs,
    contacts,
    segments,
    notifications,
    addLineOA: ({ name, handle }) => {
      setLineOAs((current: LineOARecord[]) => [
        {
          id: `oa-${current.length + 1}`,
          name,
          handle,
          status: "active",
          followers: 0,
        },
        ...current,
      ]);
      toast.success("LINE OA added to prototype");
    },
    toggleLineOAStatus: (id) => {
      setLineOAs((current: LineOARecord[]) =>
        current.map((record: LineOARecord) =>
          record.id === id
            ? { ...record, status: record.status === "active" ? "inactive" : "active" }
            : record,
        ),
      );
      toast.info("LINE OA status updated");
    },
    addSegment: ({ name, description, ruleSummary }) => {
      setSegments((current: SegmentRecord[]) => [
        {
          id: `seg-${current.length + 1}`,
          name,
          description,
          ruleSummary,
          color: "default",
          memberCount: Math.max(24, Math.round(Math.random() * 180)),
        },
        ...current,
      ]);
      toast.success("Segment created in prototype");
    },
    markNotificationRead: (id) => {
      setNotifications((current: PrototypeNotification[]) =>
        current.map((notification: PrototypeNotification) =>
          notification.id === id ? { ...notification, read: true } : notification,
        ),
      );
    },
    markAllNotificationsRead: () => {
      setNotifications((current: PrototypeNotification[]) =>
        current.map((notification: PrototypeNotification) => ({ ...notification, read: true })),
      );
    },
  }), [contacts, lineOAs, notifications, segments]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
}
