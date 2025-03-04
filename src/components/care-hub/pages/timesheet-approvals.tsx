import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

interface Timesheet {
  id: string;
  worker: string;
  workerId: string;
  role: string;
  date: string;
  time: string;
  hours: string;
  status: "Pending" | "Approved" | "Rejected";
  timesheetId: string;
}

export function TimesheetApprovals() {
  const timesheets: Timesheet[] = [
    {
      id: "timesheet-1",
      worker: "John Doe",
      workerId: "CW-001",
      role: "Registered Nurse",
      date: "Mon, 15 Apr",
      time: "07:00 - 19:00",
      hours: "12",
      status: "Pending",
      timesheetId: "TS-12345",
    },
    {
      id: "timesheet-2",
      worker: "Jane Smith",
      workerId: "CW-002",
      role: "Registered Nurse",
      date: "Wed, 17 Apr",
      time: "08:00 - 20:00",
      hours: "12",
      status: "Pending",
      timesheetId: "TS-67890",
    },
    {
      id: "timesheet-3",
      worker: "Alex Johnson",
      workerId: "CW-003",
      role: "Registered Nurse",
      date: "Fri, 19 Apr",
      time: "19:00 - 07:00",
      hours: "12",
      status: "Pending",
      timesheetId: "TS-34567",
    },
    {
      id: "timesheet-4",
      worker: "Michael Brown",
      workerId: "CW-005",
      role: "Registered Nurse",
      date: "Sat, 13 Apr",
      time: "07:00 - 19:00",
      hours: "12",
      status: "Approved",
      timesheetId: "TS-45678",
    },
    {
      id: "timesheet-5",
      worker: "Emily Davis",
      workerId: "CW-006",
      role: "Registered Nurse",
      date: "Sun, 14 Apr",
      time: "07:00 - 19:00",
      hours: "12",
      status: "Approved",
      timesheetId: "TS-23456",
    },
    {
      id: "timesheet-6",
      worker: "Robert Wilson",
      workerId: "CW-007",
      role: "Registered Nurse",
      date: "Tue, 16 Apr",
      time: "08:00 - 20:00",
      hours: "12",
      status: "Rejected",
      timesheetId: "TS-78901",
    },
  ];

  const pendingTimesheets = timesheets.filter(
    (timesheet) => timesheet.status === "Pending",
  );
  const approvedTimesheets = timesheets.filter(
    (timesheet) => timesheet.status === "Approved",
  );
  const rejectedTimesheets = timesheets.filter(
    (timesheet) => timesheet.status === "Rejected",
  );

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6">
          <div className="flex items-center">
            <div className="bg-yellow-50 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
            </div>
            <div className="ml-2 mr-0">
              <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0">
                Timesheet Approvals
              </CardTitle>
              <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                Review and approve submitted timesheets
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending" className="relative">
                Pending
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">
                  {pendingTimesheets.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="approved" className="relative">
                Approved
                {approvedTimesheets.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                    {approvedTimesheets.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="rejected" className="relative">
                Rejected
                {rejectedTimesheets.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {rejectedTimesheets.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-0">
              <div className="space-y-4">
                {pendingTimesheets.map((timesheet) => (
                  <TimesheetCard key={timesheet.id} timesheet={timesheet} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="approved" className="mt-0">
              <div className="space-y-4">
                {approvedTimesheets.map((timesheet) => (
                  <TimesheetCard key={timesheet.id} timesheet={timesheet} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rejected" className="mt-0">
              <div className="space-y-4">
                {rejectedTimesheets.map((timesheet) => (
                  <TimesheetCard key={timesheet.id} timesheet={timesheet} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function TimesheetCard({ timesheet }: { timesheet: Timesheet }) {
  return (
    <div className="flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300">
      <div className="flex w-full min-w-0 flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
            {timesheet.worker}
          </h3>
          <div
            className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold ${timesheet.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-transparent" : timesheet.status === "Approved" ? "bg-green-100 text-green-800 border-transparent" : "bg-red-100 text-red-800 border-transparent"}`}
          >
            {timesheet.status}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
          <span>Worker ID: {timesheet.workerId}</span>
          <span>•</span>
          <span>{timesheet.role}</span>
          <span>•</span>
          <span>Timesheet ID: {timesheet.timesheetId}</span>
        </div>
        <div className="flex w-full min-w-0 items-center gap-4 mt-1 mb-0 text-sm">
          <div className="flex items-center">
            <span className="font-medium">Date:</span>
            <span className="ml-1">{timesheet.date}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Time:</span>
            <span className="ml-1">{timesheet.time}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Hours:</span>
            <span className="ml-1">{timesheet.hours}</span>
          </div>
        </div>
        <div className="flex justify-end items-center mt-2">
          {timesheet.status === "Pending" && (
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
          )}
          {(timesheet.status === "Approved" ||
            timesheet.status === "Rejected") && (
            <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
