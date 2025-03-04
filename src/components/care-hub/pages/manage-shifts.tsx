import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

interface Shift {
  id: string;
  role: string;
  date: string;
  time: string;
  rate: string;
  status: "Open" | "Pending" | "Approved" | "Completed" | "Cancelled";
  shiftId: string;
  workerName?: string;
  workerId?: string;
}

export function ManageShifts() {
  const shifts: Shift[] = [
    {
      id: "shift-1",
      role: "Registered Nurse",
      date: "Mon, 15 Apr",
      time: "07:00 - 19:00",
      rate: "£25/hr",
      status: "Open",
      shiftId: "SH-12345",
    },
    {
      id: "shift-2",
      role: "Registered Nurse",
      date: "Tue, 16 Apr",
      time: "07:00 - 19:00",
      rate: "£25/hr",
      status: "Open",
      shiftId: "SH-12346",
    },
    {
      id: "shift-3",
      role: "Registered Nurse",
      date: "Wed, 17 Apr",
      time: "07:00 - 19:00",
      rate: "£25/hr",
      status: "Open",
      shiftId: "SH-12347",
    },
    {
      id: "shift-4",
      role: "Registered Nurse",
      date: "Wed, 17 Apr",
      time: "08:00 - 20:00",
      rate: "£27/hr",
      status: "Pending",
      shiftId: "SH-67890",
      workerName: "Jane Smith",
      workerId: "CW-001",
    },
    {
      id: "shift-5",
      role: "Registered Nurse",
      date: "Thu, 18 Apr",
      time: "08:00 - 20:00",
      rate: "£27/hr",
      status: "Pending",
      shiftId: "SH-67891",
      workerName: "John Doe",
      workerId: "CW-002",
    },
    {
      id: "shift-6",
      role: "Registered Nurse",
      date: "Mon, 15 Apr",
      time: "19:00 - 07:00",
      rate: "£30/hr",
      status: "Approved",
      shiftId: "SH-34567",
      workerName: "Alex Johnson",
      workerId: "CW-003",
    },
    {
      id: "shift-7",
      role: "Registered Nurse",
      date: "Tue, 16 Apr",
      time: "19:00 - 07:00",
      rate: "£30/hr",
      status: "Approved",
      shiftId: "SH-34568",
      workerName: "Sarah Williams",
      workerId: "CW-004",
    },
    {
      id: "shift-8",
      role: "Registered Nurse",
      date: "Mon, 15 Apr",
      time: "07:00 - 19:00",
      rate: "£32/hr",
      status: "Completed",
      shiftId: "SH-45678",
      workerName: "Michael Brown",
      workerId: "CW-005",
    },
    {
      id: "shift-9",
      role: "Registered Nurse",
      date: "Sun, 14 Apr",
      time: "07:00 - 19:00",
      rate: "£32/hr",
      status: "Completed",
      shiftId: "SH-45677",
      workerName: "Emily Davis",
      workerId: "CW-006",
    },
    {
      id: "shift-10",
      role: "Registered Nurse",
      date: "Sat, 13 Apr",
      time: "08:00 - 20:00",
      rate: "£27/hr",
      status: "Cancelled",
      shiftId: "SH-67889",
      workerName: "Robert Wilson",
      workerId: "CW-007",
    },
  ];

  const openShifts = shifts.filter((shift) => shift.status === "Open");
  const pendingShifts = shifts.filter((shift) => shift.status === "Pending");
  const approvedShifts = shifts.filter((shift) => shift.status === "Approved");

  const completedShifts = shifts.filter(
    (shift) => shift.status === "Completed",
  );
  const cancelledShifts = shifts.filter(
    (shift) => shift.status === "Cancelled",
  );

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0">
                  Manage Shifts
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  View and manage all shifts by status
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="open" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="open" className="relative">
                Open
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                  {openShifts.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="pending" className="relative">
                Pending
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">
                  {pendingShifts.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="approved" className="relative">
                Approved
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                  {approvedShifts.length}
                </span>
              </TabsTrigger>

              <TabsTrigger value="completed" className="relative">
                Completed
                {completedShifts.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center">
                    {completedShifts.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="relative">
                Cancelled
                {cancelledShifts.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {cancelledShifts.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="open" className="mt-0">
              <div className="space-y-4">
                {openShifts.map((shift) => (
                  <ShiftCard key={shift.id} shift={shift} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-0">
              <div className="space-y-4">
                {pendingShifts.map((shift) => (
                  <ShiftCard key={shift.id} shift={shift} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="approved" className="mt-0">
              <div className="space-y-4">
                {approvedShifts.map((shift) => (
                  <ShiftCard key={shift.id} shift={shift} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="space-y-4">
                {completedShifts.map((shift) => (
                  <ShiftCard key={shift.id} shift={shift} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cancelled" className="mt-0">
              <div className="space-y-4">
                {cancelledShifts.map((shift) => (
                  <ShiftCard key={shift.id} shift={shift} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function ShiftCard({ shift }: { shift: Shift }) {
  // Calculate duration from time string (e.g., "07:00 - 19:00")
  const calculateDuration = (timeString: string) => {
    const [start, end] = timeString.split(" - ");
    const startHour = parseInt(start.split(":")[0]);
    const endHour = parseInt(end.split(":")[0]);

    // Handle overnight shifts
    let duration = endHour - startHour;
    if (duration < 0) duration += 24;

    return `${duration} hours`;
  };

  return (
    <div className="flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300">
      <div className="flex w-full min-w-0 flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
            {shift.role}
          </h3>
          <div
            className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold ${shift.status === "Open" ? "bg-blue-100 text-blue-800 border-transparent" : shift.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-transparent" : shift.status === "Approved" ? "bg-green-100 text-green-800 border-transparent" : shift.status === "Completed" ? "bg-gray-100 text-gray-800 border-transparent" : "bg-red-100 text-red-800 border-transparent"}`}
          >
            {shift.status}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
          <span>ID: {shift.shiftId}</span>
          {shift.status !== "Open" && shift.workerName && (
            <>
              <span>•</span>
              <span>Worker: {shift.workerName}</span>
            </>
          )}
          {shift.status !== "Open" && shift.workerId && (
            <>
              <span>•</span>
              <span>Worker ID: {shift.workerId}</span>
            </>
          )}
        </div>
        <div className="flex w-full min-w-0 items-center gap-4 mt-1 mb-0 text-sm">
          <div className="flex items-center">
            <span className="font-medium">Date:</span>
            <span className="ml-1">{shift.date}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Duration:</span>
            <span className="ml-1">{calculateDuration(shift.time)}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Rate:</span>
            <span className="ml-1">{shift.rate}</span>
          </div>
        </div>
        <div className="flex justify-end items-center mt-2">
          {shift.status === "Open" && (
            <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
              Edit Shift
            </button>
          )}
          {shift.status === "Pending" && (
            <div className="flex gap-2">
              <button className="text-sm normal-case bg-green-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-green-600 m-0 px-3 py-0 rounded-md [appearance:button]">
                Approve
              </button>
              <button className="text-sm normal-case bg-red-50 text-red-600 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-red-100 m-0 px-3 py-0 rounded-md [appearance:button]">
                Reject
              </button>
            </div>
          )}
          {(shift.status === "Approved" ||
            shift.status === "Completed" ||
            shift.status === "Cancelled") && (
            <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
