import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Upload, CheckCircle } from "lucide-react";

interface TimesheetEntry {
  id: string;
  facility: string;
  role: string;
  date: string;
  time: string;
  status: "Approved" | "Pending";
  timesheetId: string;
}

export function Timesheet() {
  const timesheets: TimesheetEntry[] = [
    {
      id: "timesheet-1",
      facility: "Sunrise Care Home",
      role: "Registered Nurse",
      date: "Mon, 15 Apr",
      time: "07:00 - 19:00",
      status: "Approved",
      timesheetId: "TS-12345",
    },
    {
      id: "timesheet-2",
      facility: "Meadow View Care",
      role: "Registered Nurse",
      date: "Wed, 17 Apr",
      time: "08:00 - 20:00",
      status: "Pending",
      timesheetId: "TS-67890",
    },
    {
      id: "timesheet-3",
      facility: "Oakwood Nursing Home",
      role: "Registered Nurse",
      date: "Fri, 12 Apr",
      time: "19:00 - 07:00",
      status: "Approved",
      timesheetId: "TS-54321",
    },
    {
      id: "timesheet-4",
      facility: "Riverside Care Center",
      role: "Registered Nurse",
      date: "Sat, 13 Apr",
      time: "07:00 - 19:00",
      status: "Pending",
      timesheetId: "TS-98765",
    },
  ];

  const pendingTimesheets = timesheets.filter(
    (timesheet) => timesheet.status === "Pending",
  );
  const approvedTimesheets = timesheets.filter(
    (timesheet) => timesheet.status === "Approved",
  );

  const renderTimesheetCard = (
    timesheet: TimesheetEntry,
    index: number,
    filteredTimesheets: TimesheetEntry[],
  ) => (
    <div
      key={timesheet.id}
      className={`flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] ${index !== filteredTimesheets.length - 1 ? "mb-4" : ""} shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300`}
    >
      <div className="flex w-full min-w-0 flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
            {timesheet.facility}
          </h3>
          <div
            className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold ${timesheet.status === "Approved" ? "bg-green-100 text-green-800 border-transparent" : "bg-yellow-100 text-yellow-800 border-transparent"}`}
          >
            {timesheet.status}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
          <span>{timesheet.role}</span>
          <span>•</span>
          <span>ID: {timesheet.timesheetId}</span>
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
        </div>
        <div className="flex justify-end items-center mt-2">
          {timesheet.status === "Pending" && (
            <button className="text-sm normal-case bg-blue-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-blue-600 m-0 px-3 py-0 rounded-md [appearance:button]">
              <CheckCircle className="h-4 w-4 mr-1" />
              Submit Timesheet
            </button>
          )}
          {timesheet.status === "Approved" && (
            <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6 md:p-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0 md:text-2xl text-xl md:leading-none leading-7">
                  Timesheet
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  View and manage your timesheets
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="pending" className="relative">
                Pending
                {pendingTimesheets.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">
                    {pendingTimesheets.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved" className="relative">
                Approved
                {approvedTimesheets.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                    {approvedTimesheets.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-0">
              {pendingTimesheets.length > 0 ? (
                <div className="space-y-0">
                  {pendingTimesheets.map((timesheet, index) =>
                    renderTimesheetCard(timesheet, index, pendingTimesheets),
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  No pending timesheets
                </div>
              )}
            </TabsContent>

            <TabsContent value="approved" className="mt-0">
              {approvedTimesheets.length > 0 ? (
                <div className="space-y-0">
                  {approvedTimesheets.map((timesheet, index) =>
                    renderTimesheetCard(timesheet, index, approvedTimesheets),
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  No approved timesheets
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
