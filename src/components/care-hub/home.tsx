import { useState } from "react";
import { CareHubDashboard } from "./dashboard";
import { CareHubSidebar } from "./sidebar";
import { CareHubHeader } from "./header";
import { PostShift } from "./pages/post-shift";
import { ManageShifts } from "./pages/manage-shifts";
import { TimesheetApprovals } from "./pages/timesheet-approvals";
import { CareWorkers } from "./pages/care-workers";
import { Incidents } from "./pages/incidents";
import { Reports } from "./pages/reports";
import { Invoicing } from "./pages/invoicing";
import { Notifications } from "./pages/notifications";
import { Settings } from "./pages/settings";

function CareHubHome() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Function to handle navigation
  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  // Render the appropriate component based on currentPage
  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <CareHubDashboard />;
      case "post-shift":
        return <PostShift />;
      case "manage-shifts":
        return <ManageShifts />;
      case "timesheet-approvals":
        return <TimesheetApprovals />;
      case "care-workers":
        return <CareWorkers />;
      case "incidents":
        return <Incidents />;
      case "reports":
        return <Reports />;
      case "invoicing":
        return <Invoicing />;
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings />;
      default:
        return <CareHubDashboard />;
    }
  };

  return (
    <div className="w-screen h-screen flex bg-background overflow-hidden">
      <CareHubSidebar onNavigate={handleNavigation} currentPage={currentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CareHubHeader />
        <div className="flex-1 p-2 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

export default CareHubHome;
