import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, Filter } from "lucide-react";

interface Shift {
  id: string;
  facility: string;
  role: string;
  date: string;
  time: string;
  rate: string;
  distance: string;
  address?: string;
  shiftId?: string;
  uniformRequired?: boolean;
  medTrained?: boolean;
  pmva?: boolean;
}

export function AvailableShifts() {
  const shifts: Shift[] = [
    {
      id: "shift-1",
      facility: "Sunrise Care Home",
      role: "Registered Nurse",
      date: "Mon, 15 Apr",
      time: "07:00 - 19:00",
      rate: "£25/hr",
      distance: "3.2 miles",
      address: "123 Sunrise Avenue, London, SE1 7TH",
      shiftId: "SH-78901",
      uniformRequired: true,
      medTrained: true,
      pmva: false,
    },
    {
      id: "shift-2",
      facility: "Meadow View Care",
      role: "Registered Nurse",
      date: "Wed, 17 Apr",
      time: "08:00 - 20:00",
      rate: "£27/hr",
      distance: "5.7 miles",
      address: "45 Meadow Lane, London, NW3 5RP",
      shiftId: "MV-23456",
      uniformRequired: true,
      medTrained: true,
      pmva: true,
    },
    {
      id: "shift-3",
      facility: "Oakwood Nursing Home",
      role: "Registered Nurse",
      date: "Fri, 19 Apr",
      time: "19:00 - 07:00",
      rate: "£30/hr",
      distance: "2.5 miles",
      address: "78 Oak Street, London, E14 9DQ",
      shiftId: "ON-34567",
      uniformRequired: false,
      medTrained: true,
      pmva: true,
    },
    {
      id: "shift-4",
      facility: "Riverside Care Center",
      role: "Registered Nurse",
      date: "Sat, 20 Apr",
      time: "07:00 - 19:00",
      rate: "£32/hr",
      distance: "4.1 miles",
      address: "12 River Road, London, SW11 3BH",
      shiftId: "RC-45678",
      uniformRequired: true,
      medTrained: true,
      pmva: false,
    },
  ];

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6 md:p-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0 md:text-2xl text-xl md:leading-none leading-7">
                  Available Shifts
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  Find and book shifts that match your availability
                </CardDescription>
              </div>
            </div>
            <button className="text-sm normal-case bg-white border border-slate-200 cursor-pointer inline-flex h-9 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] m-0 px-3 py-0 rounded-md [appearance:button]">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {shifts.map((shift, index) => (
              <div
                key={shift.id}
                className={`flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] ${index !== shifts.length - 1 ? "pb-4 border-b" : ""} ${index !== 0 ? "pt-4" : ""} shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300`}
              >
                <div className="flex w-full min-w-0 flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
                      {shift.facility}
                    </h3>
                    <div className="text-blue-600 font-semibold">
                      {shift.rate}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
                    <span>{shift.role}</span>
                    <span className="ml-auto">ID: {shift.shiftId}</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    <span>{shift.address}</span>
                  </div>

                  <div className="flex w-full min-w-0 items-center gap-4 mt-3 mb-0 text-sm">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <span className="font-medium">Date:</span>
                        <span className="ml-1">{shift.date}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Time:</span>
                        <span className="ml-1">{shift.time}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Distance:</span>
                        <span className="ml-1">{shift.distance}</span>
                      </div>
                    </div>

                    <div className="flex-1 flex justify-center">
                      <div className="flex flex-col gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${shift.uniformRequired ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          Uniform:{" "}
                          {shift.uniformRequired ? "Required" : "Not Required"}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${shift.medTrained ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          Med Trained
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${shift.pmva ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          PMVA: {shift.pmva ? "Required" : "Not Required"}
                        </span>
                      </div>
                    </div>

                    <div className="ml-auto self-center">
                      <button className="text-sm normal-case bg-blue-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-blue-600 m-0 px-3 py-0 rounded-md [appearance:button]">
                        Book Shift
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
