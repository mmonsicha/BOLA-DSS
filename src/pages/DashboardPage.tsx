import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  DSButton,
  EmptyState,
  StatCard,
} from "@uxuissk/design-system";
import { MessageCircle, Radio, RefreshCw, Tag, Users } from "lucide-react";
import { useAppState } from "@/state/AppStateContext";

export function DashboardPage() {
  const { contacts, lineOAs, segments } = useAppState();

  return (
    <>
      <div className="prototype-page-header">
        <div className="prototype-page-copy">
          <h1 className="prototype-page-title">BOLA DSS Dashboard</h1>
          <p className="prototype-page-subtitle">
            UI-only control panel cloned from BOLA concepts with DSS runtime components only.
          </p>
        </div>
        <DSButton variant="outline" size="md">
          <RefreshCw size={16} />
          Refresh mock data
        </DSButton>
      </div>

      <div className="prototype-grid-4">
        <StatCard title="LINE OAs" value={lineOAs.length} icon={<MessageCircle size={18} />} />
        <StatCard title="Followers" value={contacts.length} icon={<Users size={18} />} />
        <StatCard title="Broadcasts" value={4} icon={<Radio size={18} />} />
        <StatCard title="Segments" value={segments.length} icon={<Tag size={18} />} />
      </div>

      <div className="prototype-grid-2">
        <Card>
          <CardHeader action={<DSButton variant="ghost">Manage</DSButton>}>
            Connected LINE OAs
          </CardHeader>
          <CardBody>
            <div className="prototype-status-list">
              {lineOAs.map((record) => (
                <div key={record.id} className="prototype-row">
                  <div className="prototype-stack">
                    <strong>{record.name}</strong>
                    <span className="prototype-page-subtitle">{record.handle}</span>
                  </div>
                  <Badge variant={record.status === "active" ? "success" : "secondary"}>
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader action={<DSButton variant="ghost">View all</DSButton>}>
            Segment snapshot
          </CardHeader>
          <CardBody>
            {segments.length ? (
              <div className="prototype-status-list">
                {segments.map((segment) => (
                  <div key={segment.id} className="prototype-row">
                    <div className="prototype-stack">
                      <strong>{segment.name}</strong>
                      <span className="prototype-page-subtitle">{segment.ruleSummary}</span>
                    </div>
                    <Badge variant={segment.color}>{segment.memberCount}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No segments"
                description="Create a segment in the prototype to see it reflected here."
              />
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
