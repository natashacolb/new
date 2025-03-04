import { useState } from "react";
import {
  Home,
  Calendar,
  ClipboardList,
  FileText,
  Users,
  AlertTriangle,
  BarChart,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function CareHubSidebar({ onNavigate, currentPage }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`h-screen border-r border-slate-200 bg-white transition-all duration-300 ${isExpanded ? "w-64" : "w-16"}`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <button
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[100%] normal-case bg-white bg-none cursor-pointer flex h-6 w-6 items-center justify-center border border-slate-200 text-slate-400 transition-colors ease-in-out duration-[0.15s] m-0 p-0 rounded-full [appearance:button]"
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
        {isExpanded && (
          <div className="flex items-center gap-4">
            <button
              data-state="closed"
              aria-expanded="false"
              aria-haspopup="menu"
              type="button"
              className="text-sm normal-case bg-transparent bg-none cursor-pointer inline-flex h-10 w-10 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] m-0 p-0 rounded-md [appearance:button]"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-slate-500" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="absolute w-px h-px overflow-hidden whitespace-nowrap -m-px p-0 border-0 [clip:rect(0,0,0,0)]">
                Toggle theme
              </span>
            </button>
          </div>
        )}
      </div>

      {!isExpanded ? (
        <ul className="m-0 px-3 py-0 [list-style:none]">
          <li>
            <button
              onClick={() => onNavigate("dashboard")}
              className={`flex items-center justify-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "dashboard" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
            >
              <Home
                className={`h-5 w-5 ${currentPage === "dashboard" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
              />
            </button>
          </li>
          <li className="mt-1 mb-0">
            <button
              onClick={() => onNavigate("post-shift")}
              className={`flex items-center justify-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "post-shift" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
            >
              <Calendar
                className={`h-5 w-5 ${currentPage === "post-shift" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
              />
            </button>
          </li>
          <li className="mt-1 mb-0">
            <button
              onClick={() => onNavigate("manage-shifts")}
              className={`flex items-center justify-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "manage-shifts" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
            >
              <ClipboardList
                className={`h-5 w-5 ${currentPage === "manage-shifts" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
              />
            </button>
          </li>
          <li className="mt-1 mb-0">
            <button
              onClick={() => onNavigate("timesheet-approvals")}
              className={`flex items-center justify-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "timesheet-approvals" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
            >
              <FileText
                className={`h-5 w-5 ${currentPage === "timesheet-approvals" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
              />
            </button>
          </li>
          <li className="mt-1 mb-0">
            <button
              onClick={() => onNavigate("care-workers")}
              className={`flex items-center justify-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "care-workers" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
            >
              <Users
                className={`h-5 w-5 ${currentPage === "care-workers" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
              />
            </button>
          </li>
          <li className="mt-1 mb-0">
            <button
              onClick={() => onNavigate("incidents")}
              className={`flex items-center justify-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "incidents" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
            >
              <AlertTriangle
                className={`h-5 w-5 ${currentPage === "incidents" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
              />
            </button>
          </li>
          <li className="mt-1 mb-0">
            <button
              onClick={() => onNavigate("reports")}
              className={`flex items-center justify-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "reports" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
            >
              <BarChart
                className={`h-5 w-5 ${currentPage === "reports" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
              />
            </button>
          </li>
          <li className="mt-1 mb-0">
            <button
              onClick={() => onNavigate("invoicing")}
              className={`flex items-center justify-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "invoicing" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
            >
              <CreditCard
                className={`h-5 w-5 ${currentPage === "invoicing" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
              />
            </button>
          </li>
          <li className="mt-1 mb-0">
            <button
              onClick={() => onNavigate("notifications")}
              className={`flex items-center justify-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "notifications" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
            >
              <Bell
                className={`h-5 w-5 ${currentPage === "notifications" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
              />
            </button>
          </li>
          <li className="mt-1 mb-0">
            <button
              onClick={() => onNavigate("settings")}
              className={`flex items-center justify-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "settings" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
            >
              <Settings
                className={`h-5 w-5 ${currentPage === "settings" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
              />
            </button>
          </li>
          <li className="mt-1 mb-0">
            <button
              onClick={() =>
                alert("Logout functionality would be implemented here")
              }
              className="flex items-center justify-center text-sm leading-5 font-medium text-slate-700 transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full"
            >
              <LogOut className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            </button>
          </li>
        </ul>
      ) : (
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="m-0 px-3 py-0 [list-style:none]">
            <li>
              <button
                onClick={() => onNavigate("dashboard")}
                className={`flex items-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "dashboard" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
              >
                <Home
                  className={`h-5 w-5 mr-3 ${currentPage === "dashboard" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span>Dashboard</span>
                </div>
              </button>
            </li>
            <li className="mt-1 mb-0">
              <button
                onClick={() => onNavigate("post-shift")}
                className={`flex items-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "post-shift" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
              >
                <Calendar
                  className={`h-5 w-5 mr-3 ${currentPage === "post-shift" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span>Post Shift</span>
                </div>
              </button>
            </li>
            <li className="mt-1 mb-0">
              <button
                onClick={() => onNavigate("manage-shifts")}
                className={`flex items-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "manage-shifts" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
              >
                <ClipboardList
                  className={`h-5 w-5 mr-3 ${currentPage === "manage-shifts" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span>Manage Shifts</span>
                </div>
              </button>
            </li>
            <li className="mt-1 mb-0">
              <button
                onClick={() => onNavigate("timesheet-approvals")}
                className={`flex items-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "timesheet-approvals" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
              >
                <FileText
                  className={`h-5 w-5 mr-3 ${currentPage === "timesheet-approvals" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span>Timesheet Approvals</span>
                </div>
              </button>
            </li>
            <li className="mt-1 mb-0">
              <button
                onClick={() => onNavigate("care-workers")}
                className={`flex items-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "care-workers" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
              >
                <Users
                  className={`h-5 w-5 mr-3 ${currentPage === "care-workers" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span>Care Workers</span>
                </div>
              </button>
            </li>
            <li className="mt-1 mb-0">
              <button
                onClick={() => onNavigate("incidents")}
                className={`flex items-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "incidents" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
              >
                <AlertTriangle
                  className={`h-5 w-5 mr-3 ${currentPage === "incidents" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span>Incident Log</span>
                </div>
              </button>
            </li>
            <li className="mt-1 mb-0">
              <button
                onClick={() => onNavigate("reports")}
                className={`flex items-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "reports" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
              >
                <BarChart
                  className={`h-5 w-5 mr-3 ${currentPage === "reports" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span>Reports</span>
                </div>
              </button>
            </li>
            <li className="mt-1 mb-0">
              <button
                onClick={() => onNavigate("invoicing")}
                className={`flex items-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "invoicing" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
              >
                <CreditCard
                  className={`h-5 w-5 mr-3 ${currentPage === "invoicing" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span>Invoicing & Payment</span>
                </div>
              </button>
            </li>
            <li className="mt-1 mb-0">
              <button
                onClick={() => onNavigate("notifications")}
                className={`flex items-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "notifications" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
              >
                <Bell
                  className={`h-5 w-5 mr-3 ${currentPage === "notifications" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span>Notifications</span>
                </div>
              </button>
            </li>
            <li className="mt-1 mb-0">
              <button
                onClick={() => onNavigate("settings")}
                className={`flex items-center text-sm leading-5 font-medium transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full ${currentPage === "settings" ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
              >
                <Settings
                  className={`h-5 w-5 mr-3 ${currentPage === "settings" ? "text-blue-500 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span>Settings</span>
                </div>
              </button>
            </li>
            <li className="mt-1 mb-0">
              <button
                onClick={() =>
                  alert("Logout functionality would be implemented here")
                }
                className="flex items-center text-sm leading-5 font-medium text-slate-700 transition-colors ease-in-out duration-[0.15s] p-2 rounded-md w-full"
              >
                <LogOut className="h-5 w-5 mr-3 text-slate-400 dark:text-slate-500" />
                <div className="flex flex-1 items-center justify-between">
                  <span>Logout</span>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
