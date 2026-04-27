import {
  Badge,
  DSButton,
  Drawer,
  NotificationCenter,
  Sidebar,
  TopNavbar,
  toast,
  type SidebarGroup,
  type SidebarItem,
  type TopNavbarUser,
} from "@uxuissk/design-system";
import {
  BellRing,
  Database,
  LayoutDashboard,
  MessageCircle,
  MessageSquareReply,
  PanelLeftClose,
  PanelLeftOpen,
  Radio,
  Settings,
  Tag,
  Users,
  WandSparkles,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { useAppState } from "@/state/AppStateContext";
import type { RouteKey } from "@/types";

interface ShellProps {
  route: RouteKey;
  onNavigate: (route: RouteKey) => void;
  children: ReactNode;
}

type PrototypeNavId =
  | RouteKey
  | "broadcasts"
  | "auto-reply"
  | "ai-tools"
  | "settings";

const navGroups: SidebarGroup[] = [
  {
    label: "Main",
    items: [
      { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
      { id: "line-oa", label: "LINE OA", icon: <MessageCircle size={18} /> },
      { id: "contacts", label: "Contacts", icon: <Users size={18} /> },
      { id: "segments", label: "Segments", icon: <Tag size={18} /> },
    ],
  },
  {
    label: "Messaging",
    items: [
      { id: "broadcasts", label: "Broadcasts", icon: <Radio size={18} />, badge: "4" },
      { id: "auto-reply", label: "Auto Reply", icon: <MessageSquareReply size={18} /> },
    ],
  },
  {
    label: "Workspace",
    items: [
      { id: "ai-tools", label: "AI Tools", icon: <WandSparkles size={18} /> },
      { id: "settings", label: "Settings", icon: <Settings size={18} /> },
    ],
  },
];

const breadcrumbLabels: Record<RouteKey, string[]> = {
  dashboard: ["Home", "Dashboard"],
  "line-oa": ["Channels", "LINE OA"],
  contacts: ["Audience", "Contacts"],
  segments: ["Audience", "Segments"],
};

const pageTitles: Record<RouteKey, string> = {
  dashboard: "Dashboard",
  "line-oa": "LINE OA",
  contacts: "Contacts",
  segments: "Segments",
};

function isRouteKey(value: string): value is RouteKey {
  return value === "dashboard" || value === "line-oa" || value === "contacts" || value === "segments";
}

export function Shell({ route, onNavigate, children }: ShellProps) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const unreadCount = notifications.filter((item) => !item.read).length;

  const user = useMemo<TopNavbarUser>(() => ({ name: "BOLA Prototype" }), []);

  const handleSidebarNavigate = (item: SidebarItem) => {
    if (isRouteKey(item.id)) {
      onNavigate(item.id);
      return;
    }
    toast.info(`${item.label} is outside the current prototype scope.`);
  };

  const handleShellToggle = () => {
    if (window.matchMedia("(max-width: 960px)").matches) {
      setMobileOpen((current) => !current);
      return;
    }
    setSidebarCollapsed((current) => !current);
  };

  const topbarActions = (
    <div className="prototype-topnav-actions">
      <Badge variant="outline">Prototype</Badge>
      <DSButton
        variant="ghost"
        size="md"
        onClick={() => setNotificationsOpen(true)}
        aria-label="Open notifications"
      >
        <BellRing size={16} />
      </DSButton>
    </div>
  );

  return (
    <div className="prototype-shell">
      <div className="prototype-topnav">
        <TopNavbar
          className="prototype-topnav-component"
          brand={{ name: "BOLA DSS Prototype", logo: "/bola-logo.svg" }}
          breadcrumbs={breadcrumbLabels[route].map((label, index, arr) => ({
            label,
            href: index === arr.length - 1 ? undefined : "#",
          }))}
          user={user}
          notificationCount={unreadCount}
          onNotificationClick={() => setNotificationsOpen(true)}
          onMobileMenuClick={handleShellToggle}
          actions={topbarActions}
        />
        <div className="prototype-topnav-toggle">
          <DSButton
            variant="ghost"
            size="md"
            onClick={handleShellToggle}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </DSButton>
        </div>
      </div>

      <div className="prototype-shell-body">
        <div className="prototype-sidebar">
          <Sidebar
            brand={{ name: "BOLA", logo: "/bola-logo.svg" }}
            groups={navGroups}
            activeItem={route}
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
            onNavigate={handleSidebarNavigate}
          />
        </div>

        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          title="Navigation"
          side="left"
          size="md"
        >
          <Sidebar
            brand={{ name: "BOLA", logo: "/bola-logo.svg" }}
            groups={navGroups}
            activeItem={route}
            onNavigate={(item: SidebarItem) => {
              handleSidebarNavigate(item);
              setMobileOpen(false);
            }}
          />
        </Drawer>

        <div className="prototype-main">
          <Drawer
            open={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
            title="Prototype notifications"
            side="right"
            size="md"
          >
            <NotificationCenter
              items={notifications.map((item) => ({
                id: item.id,
                type: "info",
                title: item.title,
                message: item.message,
                time: item.time,
                read: item.read,
              }))}
              onMarkRead={markNotificationRead}
              onMarkAllRead={markAllNotificationsRead}
              onDismiss={() => undefined}
              onClearAll={() => undefined}
            />
          </Drawer>

          <main className="prototype-content" aria-label={pageTitles[route]}>
            {children}
            <div className="prototype-footer-note">
              <Database size={14} style={{ marginRight: "8px", verticalAlign: "middle" }} />
              DSS-only front-end prototype with local mock data and no backend dependency.
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
