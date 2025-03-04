import { useState } from "react";
import { Header } from "./ui/header";
import { Sidebar } from "./ui/sidebar";
import { Dashboard } from "./ui/dashboard";
import {
  AvailableShifts,
  MyBookings,
  MyAvailability,
  Timesheet,
  Payslips,
  Compliance,
  Reports,
  Settings,
} from "./ui/pages";

function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Function to handle navigation
  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  // Render the appropriate component based on currentPage
  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "available-shifts":
        return <AvailableShifts />;
      case "my-bookings":
        return <MyBookings />;
      case "my-availability":
        return <MyAvailability />;
      case "timesheet":
        return <Timesheet />;
      case "payslips":
        return <Payslips />;
      case "compliance":
        return <Compliance />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="w-screen h-screen flex bg-background overflow-hidden">
      <Sidebar onNavigate={handleNavigation} currentPage={currentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 p-2 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Home;
