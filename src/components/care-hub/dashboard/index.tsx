import {
  Clock,
  Calendar,
  CreditCard,
  Bell,
  Users,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { AnalyticCard } from "../../ui/dashboard/analytics-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CareHubDashboard() {
  return (
    <div className="pt-0">
      {/* Overview Analytics Cards */}
      <div className="grid gap-4 mb-4 md:grid-cols-[repeat(2,minmax(0px,1fr))] lg:grid-cols-[repeat(4,minmax(0px,1fr))]">
        <AnalyticCard
          title="Active Shifts"
          value="12"
          subtext="3 shifts in progress"
          icon={Clock}
          iconColor="text-blue-500"
          iconBgColor="bg-blue-50"
        />
        <AnalyticCard
          title="Pending Timesheets"
          value="8"
          subtext="Awaiting approval"
          icon={FileText}
          iconColor="text-yellow-500"
          iconBgColor="bg-yellow-50"
        />
        <AnalyticCard
          title="Care Workers"
          value="24"
          subtext="5 currently on shift"
          icon={Users}
          iconColor="text-green-500"
          iconBgColor="bg-green-50"
        />
        <AnalyticCard
          title="Incidents"
          value="2"
          subtext="Require attention"
          icon={AlertTriangle}
          iconColor="text-red-500"
          iconBgColor="bg-red-50"
        />
      </div>

      {/* Main Dashboard Sections */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <ManageShifts />
      </div>

      <div className="grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-4 mb-4 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
        <TimesheetApprovals />
        <CareWorkerManagement />
      </div>
    </div>
  );
}

function ManageShifts() {
  return (
    <div className="bg-white rounded-lg border-2 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] overflow-hidden">
      <div className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-2">
              <h2 className="text-2xl leading-none font-semibold -tracking-wide m-0">
                Manage Shifts
              </h2>
              <p className="text-sm leading-5 text-neutral-500 m-0">
                View and manage all shifts by status
              </p>
            </div>
          </div>
          <button className="text-sm normal-case bg-blue-500 text-white cursor-pointer inline-flex h-9 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-blue-600 m-0 px-3 py-0 rounded-md [appearance:button]">
            Post New Shift
          </button>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="open" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="open" className="relative">
              Open
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                8
              </span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              Pending
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">
                3
              </span>
            </TabsTrigger>
            <TabsTrigger value="approved" className="relative">
              Approved
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                5
              </span>
            </TabsTrigger>
            <TabsTrigger value="in-progress">In-Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="mt-0">
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <ShiftCard
                  key={index}
                  status="Open"
                  role="Registered Nurse"
                  facility="Sunrise Care Home"
                  date="Mon, 15 Apr"
                  time="07:00 - 19:00"
                  rate="£25/hr"
                  shiftId={`SH-${12345 + index}`}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            <div className="space-y-4">
              {[1, 2].map((_, index) => (
                <ShiftCard
                  key={index}
                  status="Pending"
                  role="Registered Nurse"
                  facility="Meadow View Care"
                  date="Wed, 17 Apr"
                  time="08:00 - 20:00"
                  rate="£27/hr"
                  shiftId={`SH-${67890 + index}`}
                  workerName="Jane Smith"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-0">
            <div className="text-center py-8 text-slate-500">
              Approved shifts would appear here
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="mt-0">
            <div className="text-center py-8 text-slate-500">
              In-progress shifts would appear here
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            <div className="text-center py-8 text-slate-500">
              Completed shifts would appear here
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-0">
            <div className="text-center py-8 text-slate-500">
              Cancelled shifts would appear here
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ShiftCard({
  status,
  role,
  facility,
  date,
  time,
  rate,
  shiftId,
  workerName,
}: {
  status:
    | "Open"
    | "Pending"
    | "Approved"
    | "In-Progress"
    | "Completed"
    | "Cancelled";
  role: string;
  facility: string;
  date: string;
  time: string;
  rate: string;
  shiftId: string;
  workerName?: string;
}) {
  return (
    <div className="flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300">
      <div className="flex w-full min-w-0 flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
            {facility}
          </h3>
          <div
            className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold ${status === "Open" ? "bg-blue-100 text-blue-800 border-transparent" : status === "Pending" ? "bg-yellow-100 text-yellow-800 border-transparent" : status === "Approved" ? "bg-green-100 text-green-800 border-transparent" : status === "In-Progress" ? "bg-purple-100 text-purple-800 border-transparent" : status === "Completed" ? "bg-gray-100 text-gray-800 border-transparent" : "bg-red-100 text-red-800 border-transparent"}`}
          >
            {status}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
          <span>{role}</span>
          <span>•</span>
          <span>ID: {shiftId}</span>
          {workerName && (
            <>
              <span>•</span>
              <span>Worker: {workerName}</span>
            </>
          )}
        </div>
        <div className="flex w-full min-w-0 items-center gap-4 mt-1 mb-0 text-sm">
          <div className="flex items-center">
            <span className="font-medium">Date:</span>
            <span className="ml-1">{date}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Time:</span>
            <span className="ml-1">{time}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Rate:</span>
            <span className="ml-1">{rate}</span>
          </div>
        </div>
        <div className="flex justify-end items-center mt-2">
          {status === "Open" && (
            <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
              Edit Shift
            </button>
          )}
          {status === "Pending" && (
            <div className="flex gap-2">
              <button className="text-sm normal-case bg-green-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-green-600 m-0 px-3 py-0 rounded-md [appearance:button]">
                Approve
              </button>
              <button className="text-sm normal-case bg-red-50 text-red-600 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-red-100 m-0 px-3 py-0 rounded-md [appearance:button]">
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TimesheetApprovals() {
  return (
    <div className="bg-white rounded-lg border-2 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] overflow-hidden">
      <div className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6">
        <div className="flex items-center">
          <div className="bg-yellow-50 p-2 rounded-lg">
            <FileText className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-2">
            <h2 className="text-2xl leading-none font-semibold -tracking-wide m-0">
              Timesheet Approvals
            </h2>
            <p className="text-sm leading-5 text-neutral-500 m-0">
              Review and approve submitted timesheets
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300"
            >
              <div className="flex w-full min-w-0 flex-col">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
                    {index === 0
                      ? "Sunrise Care Home"
                      : index === 1
                        ? "Meadow View Care"
                        : "Oakwood Nursing Home"}
                  </h3>
                  <div className="inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border-transparent">
                    Pending Approval
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
                  <span>Registered Nurse</span>
                  <span>•</span>
                  <span>
                    Worker:{" "}
                    {index === 0
                      ? "John Doe"
                      : index === 1
                        ? "Jane Smith"
                        : "Alex Johnson"}
                  </span>
                  <span>•</span>
                  <span>ID: TS-{67890 + index}</span>
                </div>
                <div className="flex w-full min-w-0 items-center gap-4 mt-1 mb-0 text-sm">
                  <div className="flex items-center">
                    <span className="font-medium">Date:</span>
                    <span className="ml-1">
                      {index === 0
                        ? "Mon, 15 Apr"
                        : index === 1
                          ? "Wed, 17 Apr"
                          : "Fri, 19 Apr"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Time:</span>
                    <span className="ml-1">
                      {index === 0
                        ? "07:00 - 19:00"
                        : index === 1
                          ? "08:00 - 20:00"
                          : "19:00 - 07:00"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Hours:</span>
                    <span className="ml-1">
                      {index === 0 ? "12" : index === 1 ? "12" : "12"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end items-center mt-2">
                  <div className="flex gap-2">
                    <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                      View Details
                    </button>
                    <button className="text-sm normal-case bg-green-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-green-600 m-0 px-3 py-0 rounded-md [appearance:button]">
                      Approve
                    </button>
                    <button className="text-sm normal-case bg-red-50 text-red-600 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-red-100 m-0 px-3 py-0 rounded-md [appearance:button]">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CareWorkerManagement() {
  return (
    <div className="bg-white rounded-lg border-2 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] overflow-hidden">
      <div className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-green-50 p-2 rounded-lg">
              <Users className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-2">
              <h2 className="text-2xl leading-none font-semibold -tracking-wide m-0">
                Care Workers
              </h2>
              <p className="text-sm leading-5 text-neutral-500 m-0">
                Manage your care worker preferences
              </p>
            </div>
          </div>
          <button className="text-sm normal-case bg-white border border-slate-200 cursor-pointer inline-flex h-9 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] m-0 px-3 py-0 rounded-md [appearance:button]">
            View All
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300"
            >
              <div className="flex w-full min-w-0 items-center">
                <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-slate-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
                    {index === 0
                      ? "John Doe"
                      : index === 1
                        ? "Jane Smith"
                        : "Alex Johnson"}
                  </h3>
                  <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
                    <span>Registered Nurse</span>
                    <span>•</span>
                    <span>
                      Last shift:{" "}
                      {index === 0
                        ? "2 days ago"
                        : index === 1
                          ? "Yesterday"
                          : "1 week ago"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                    View Profile
                  </button>
                  <button className="text-sm normal-case bg-blue-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-blue-600 m-0 px-3 py-0 rounded-md [appearance:button]">
                    Assign Shift
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
