import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DSTable,
  EmptyState,
  SearchField,
  Tabs,
  type DropdownOption,
  type TableColumn,
  type TabItem,
} from "@uxuissk/design-system";
import { Phone, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { useAppState } from "@/state/AppStateContext";
import type { ContactRecord } from "@/types";

const lineOaFilterLabel = "All LINE OAs";

export function ContactsPage() {
  const { contacts, lineOAs } = useAppState();
  const [activeTab, setActiveTab] = useState("followers");
  const [query, setQuery] = useState("");
  const [lineOaId, setLineOaId] = useState("all");

  const tabItems = useMemo<TabItem[]>(
    () => [
      { id: "followers", label: "All followers", icon: <Users size={16} />, badge: contacts.length },
      {
        id: "phone",
        label: "Phone",
        icon: <Phone size={16} />,
        badge: contacts.filter((contact) => contact.phone).length,
      },
    ],
    [contacts],
  );

  const lineOaOptions = useMemo<DropdownOption[]>(
    () => [
      { value: "all", label: lineOaFilterLabel },
      ...lineOAs.map((record) => ({ value: record.id, label: record.name })),
    ],
    [lineOAs],
  );

  const rows = useMemo(
    () =>
      contacts.filter((contact) => {
        const haystack = `${contact.displayName} ${contact.lineUserId} ${contact.phone ?? ""} ${contact.email ?? ""}`.toLowerCase();
        const matchesSearch = haystack.includes(query.trim().toLowerCase());
        const matchesLineOa = lineOaId === "all" || contact.lineOaId === lineOaId;
        const matchesTab = activeTab === "followers" || Boolean(contact.phone);
        return matchesSearch && matchesLineOa && matchesTab;
      }),
    [activeTab, contacts, lineOaId, query],
  );

  const columns = useMemo<TableColumn<ContactRecord>[]>(
    () => [
      {
        key: "displayName",
        header: "Contact",
        render: (_, row) => (
          <div className="prototype-stack">
            <strong>{row.displayName}</strong>
            <span className="prototype-page-subtitle">{row.lineUserId}</span>
          </div>
        ),
      },
      {
        key: "phone",
        header: "Phone",
        render: (value) => String(value ?? "—"),
      },
      {
        key: "email",
        header: "Email",
        render: (value) => String(value ?? "—"),
      },
      {
        key: "tags",
        header: "Tags",
        render: (value) => (
          <div className="prototype-pill-list">
            {(value as string[]).map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <div className="prototype-page-header">
        <div className="prototype-page-copy">
          <h1 className="prototype-page-title">Contacts</h1>
          <p className="prototype-page-subtitle">
            Prototype contact management with tab switch, search, and DSS data table.
          </p>
        </div>
      </div>

      <Card>
        <CardBody>
          <div className="prototype-stack">
            <Tabs tabs={tabItems} activeTab={activeTab} onChange={setActiveTab} size="md" variant="underline" />
            <div className="prototype-toolbar">
              <div className="prototype-toolbar-grow">
                <SearchField
                  placeholder="Search contacts by name, LINE UID, phone, or email"
                  value={query}
                  onChange={setQuery}
                />
              </div>
              <div className="prototype-toolbar-fixed">
                <Dropdown
                  label="LINE OA"
                  options={lineOaOptions}
                  value={lineOaId}
                  onChange={(value) => setLineOaId(String(value))}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {activeTab === "phone" && !rows.length ? (
        <Card>
          <CardBody>
            <EmptyState
              title="No phone contacts"
              description="This prototype starts with follower-first data. Add phone records in a later phase if needed."
            />
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader action={<Badge variant="outline">{rows.length} contacts</Badge>}>
            Contact directory
          </CardHeader>
          <CardBody>
            <DSTable columns={columns} data={rows} hoverable striped />
          </CardBody>
        </Card>
      )}
    </>
  );
}
