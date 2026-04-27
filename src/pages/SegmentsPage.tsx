import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  DSButton,
  DSInput,
  DSTable,
  Modal,
  StatCard,
  type TableColumn,
} from "@uxuissk/design-system";
import { Plus, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import { useAppState } from "@/state/AppStateContext";
import type { SegmentRecord } from "@/types";

export function SegmentsPage() {
  const { addSegment, contacts, segments } = useAppState();
  const [modalOpen, setModalOpen] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftRule, setDraftRule] = useState("");

  const columns = useMemo<TableColumn<SegmentRecord>[]>(
    () => [
      {
        key: "name",
        header: "Segment",
        render: (_, row) => (
          <div className="prototype-stack">
            <strong>{row.name}</strong>
            <span className="prototype-page-subtitle">{row.description}</span>
          </div>
        ),
      },
      {
        key: "ruleSummary",
        header: "Rule summary",
      },
      {
        key: "memberCount",
        header: "Members",
        align: "right",
        render: (value) => Number(value).toLocaleString(),
      },
      {
        key: "color",
        header: "Status",
        align: "center",
        render: (value) => <Badge variant={String(value) as SegmentRecord["color"]}>{String(value)}</Badge>,
      },
    ],
    [],
  );

  const closeModal = () => {
    setModalOpen(false);
    setDraftName("");
    setDraftDescription("");
    setDraftRule("");
  };

  return (
    <>
      <div className="prototype-page-header">
        <div className="prototype-page-copy">
          <h1 className="prototype-page-title">Segments</h1>
          <p className="prototype-page-subtitle">
            Build and inspect audience groups in a local DSS-driven prototype.
          </p>
        </div>
        <DSButton variant="primary" size="md" onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          New segment
        </DSButton>
      </div>

      <div className="prototype-grid-2">
        <StatCard title="Segments" value={segments.length} icon={<Tag size={18} />} />
        <StatCard title="Audience coverage" value={`${Math.min(100, Math.round((segments.length * 100) / Math.max(contacts.length, 1)))}%`} />
      </div>

      <Card>
        <CardHeader action={<Badge variant="outline">{segments.length} active</Badge>}>
          Segment library
        </CardHeader>
        <CardBody>
          <DSTable columns={columns} data={segments} bordered hoverable />
        </CardBody>
      </Card>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Create segment"
        description="Add a new local segment to test dashboard and list interactions."
        footer={(
          <>
            <DSButton variant="secondary" size="md" onClick={closeModal}>Cancel</DSButton>
            <DSButton
              variant="primary"
              size="md"
              onClick={() => {
                if (!draftName || !draftDescription || !draftRule) return;
                addSegment({ name: draftName, description: draftDescription, ruleSummary: draftRule });
                closeModal();
              }}
            >
              Save segment
            </DSButton>
          </>
        )}
      >
        <div className="prototype-stack">
          <DSInput
            label="Segment name"
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            placeholder="VIP repeat buyers"
            fullWidth
          />
          <DSInput
            label="Description"
            value={draftDescription}
            onChange={(event) => setDraftDescription(event.target.value)}
            placeholder="High-value customers with repeat purchase history"
            fullWidth
          />
          <DSInput
            label="Rule summary"
            value={draftRule}
            onChange={(event) => setDraftRule(event.target.value)}
            placeholder="Tag = VIP and purchase within 90 days"
            fullWidth
          />
        </div>
      </Modal>
    </>
  );
}
