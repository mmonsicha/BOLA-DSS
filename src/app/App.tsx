import { Alert } from "@uxuissk/design-system";
import { Shell } from "@/components/Shell";
import { DashboardPage } from "@/pages/DashboardPage";
import { LineOAPage } from "@/pages/LineOAPage";
import { ContactsPage } from "@/pages/ContactsPage";
import { SegmentsPage } from "@/pages/SegmentsPage";
import { usePrototypeRouter } from "@/router";

export function App() {
  const { route, navigate } = usePrototypeRouter();

  return (
    <Shell route={route} onNavigate={navigate}>
      <Alert variant="info" title="Prototype mode">
        This project is a DSS-only front-end prototype cloned from the BOLA page structure with local mock data only.
      </Alert>
      {route === "dashboard" && <DashboardPage />}
      {route === "line-oa" && <LineOAPage />}
      {route === "contacts" && <ContactsPage />}
      {route === "segments" && <SegmentsPage />}
    </Shell>
  );
}
