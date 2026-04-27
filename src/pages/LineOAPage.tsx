import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DSButton,
  DSInput,
  DSTable,
  Modal,
  type DropdownOption,
  type TableColumn,
} from "@uxuissk/design-system";
import { Plus, Radio } from "lucide-react";
import { useMemo, useState } from "react";
import { useAppState } from "@/state/AppStateContext";
import type { LineOARecord } from "@/types";

const statusOptions: DropdownOption[] = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export function LineOAPage() {
  const { addLineOA, lineOAs, toggleLineOAStatus } = useAppState();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftHandle, setDraftHandle] = useState("");

  const rows = useMemo(
    () =>
      lineOAs.filter((record) => {
        const matchesStatus = status === "all" || record.status === status;
        const haystack = `${record.name} ${record.handle}`.toLowerCase();
        const matchesSearch = haystack.includes(query.trim().toLowerCase());
        return matchesStatus && matchesSearch;
      }),
    [lineOAs, query, status],
  );

  const columns = useMemo<TableColumn<LineOARecord>[]>(
    () => [
      {
        key: "name",
        header: "LINE OA",
        render: (_, row) => (
          <div className="prototype-stack">
            <strong>{row.name}</strong>
            <span className="prototype-page-subtitle">{row.handle}</span>
          </div>
        ),
      },
      {
        key: "followers",
        header: "Followers",
        align: "right",
        render: (value) => Number(value).toLocaleString(),
      },
      {
        key: "status",
        header: "Status",
        align: "center",
        render: (value) => (
          <Badge variant={value === "active" ? "success" : "secondary"}>{String(value)}</Badge>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        render: (_, row) => (
          <DSButton variant="ghost" size="md" onClick={() => toggleLineOAStatus(row.id)}>
            Toggle status
          </DSButton>
        ),
      },
    ],
    [toggleLineOAStatus],
  );

  const resetModal = () => {
    setDraftName("");
    setDraftHandle("");
    setModalOpen(false);
  };

  return (
    <>
      <div className="prototype-page-header">
        <div className="prototype-page-copy">
          <h1 className="prototype-page-title">LINE OA Workspace</h1>
          <p className="prototype-page-subtitle">
            Manage connected OA channels in a DSS-only prototype flow.
          </p>
        </div>
        <DSButton variant="primary" size="md" onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          Connect LINE OA
        </DSButton>
      </div>

      <Card>
        <CardHeader>Channel directory</CardHeader>
        <CardBody>
          <div className="prototype-toolbar">
            <div className="prototype-toolbar-grow">
              <DSInput
                label="Search LINE OA"
                placeholder="Search by OA name or handle"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="prototype-toolbar-fixed">
              <Dropdown
                label="Status"
                options={statusOptions}
                value={status}
                onChange={(value) => setStatus(String(value))}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader action={<Badge variant="outline">{rows.length} OA</Badge>}>
          Connected channels
        </CardHeader>
        <CardBody>
          <DSTable columns={columns} data={rows} hoverable bordered />
        </CardBody>
      </Card>

      <Modal
        open={modalOpen}
        onClose={resetModal}
        title="Connect LINE OA"
        description="Create a new mock OA record for the prototype workspace."
        footer={(
          <>
            <DSButton variant="secondary" size="md" onClick={resetModal}>Cancel</DSButton>
            <DSButton
              variant="primary"
              size="md"
              onClick={() => {
                if (!draftName || !draftHandle) return;
                addLineOA({ name: draftName, handle: draftHandle });
                resetModal();
              }}
            >
              <Radio size={16} />
              Save channel
            </DSButton>
          </>
        )}
      >
        <div className="prototype-stack">
          <DSInput
            label="OA name"
            placeholder="BOLA New Channel"
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            fullWidth
          />
          <DSInput
            label="LINE handle"
            placeholder="@bolanew"
            value={draftHandle}
            onChange={(event) => setDraftHandle(event.target.value)}
            fullWidth
          />
        </div>
      </Modal>
    </>
  );
}
