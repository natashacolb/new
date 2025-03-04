import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface Shift {
  id: string;
  facility: string;
  role: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending";
}

interface UpcomingShiftsProps {
  shifts?: Shift[];
}

export function UpcomingShifts({ shifts }: UpcomingShiftsProps) {
  // Default shifts if none provided
  const defaultShifts: Shift[] = [
    {
      id: "shift-1",
      facility: "Sunrise Care Home",
      role: "Registered Nurse",
      date: "Mon, 15 Apr",
      time: "07:00 - 19:00",
      status: "Confirmed",
    },
    {
      id: "shift-2",
      facility: "Meadow View Care",
      role: "Registered Nurse",
      date: "Wed, 17 Apr",
      time: "08:00 - 20:00",
      status: "Pending",
    },
  ];

  const displayShifts = shifts?.length ? shifts : defaultShifts;

  return (
    <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
      <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6 md:p-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div className="ml-2 mr-0">
              <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0 md:text-2xl text-xl md:leading-none leading-7">
                Upcoming Shifts
              </CardTitle>
              <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                Your scheduled shifts
              </CardDescription>
            </div>
          </div>
          <a href="/shifts">
            <button className="text-sm normal-case bg-transparent bg-none cursor-pointer inline-flex h-9 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] m-0 px-3 py-0 rounded-md [appearance:button]">
              View all
            </button>
          </a>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-6 px-6 md:px-6 md:pb-6 p-4">
        <div className="space-y-4">
          {displayShifts.map((shift, index) => (
            <div
              key={shift.id}
              className={`flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.15s] ${index === 0 ? "" : "mt-4 mb-0"} ${index !== displayShifts.length - 1 ? "pb-4 rounded-lg border-b" : "border-0"} md:p-4`}
            >
              <div className="flex w-full min-w-0 flex-col">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
                    {shift.facility}
                  </h3>
                  <div
                    className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold ${shift.status === "Confirmed" ? "bg-green-100 text-green-800 border-transparent" : "bg-yellow-100 text-yellow-800 border-transparent"}`}
                  >
                    {shift.status}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
                  <span>{shift.role}</span>
                </div>
                <div className="flex w-full min-w-0 items-center gap-4 mt-1 mb-0 text-sm">
                  <div className="flex items-center">
                    <span className="font-medium">Date:</span>
                    <span className="ml-1">{shift.date}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Time:</span>
                    <span className="ml-1">{shift.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
