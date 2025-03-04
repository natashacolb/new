import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Clock, Plus } from "lucide-react";

interface AvailabilitySlot {
  id: string;
  day: string;
  time: string;
  recurring: boolean;
}

export function MyAvailability() {
  const availabilitySlots: AvailabilitySlot[] = [
    {
      id: "slot-1",
      day: "Monday",
      time: "07:00 - 19:00",
      recurring: true,
    },
    {
      id: "slot-2",
      day: "Tuesday",
      time: "07:00 - 19:00",
      recurring: true,
    },
    {
      id: "slot-3",
      day: "Wednesday",
      time: "19:00 - 07:00",
      recurring: true,
    },
    {
      id: "slot-4",
      day: "Saturday",
      time: "07:00 - 19:00",
      recurring: false,
    },
  ];

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6 md:p-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0 md:text-2xl text-xl md:leading-none leading-7">
                  My Availability
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  Set your working hours and preferences
                </CardDescription>
              </div>
            </div>
            <button className="text-sm normal-case bg-blue-500 text-white cursor-pointer inline-flex h-9 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-blue-600 m-0 px-3 py-0 rounded-md [appearance:button]">
              <Plus className="h-4 w-4 mr-2" />
              Add Availability
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {availabilitySlots.map((slot, index) => (
              <div
                key={slot.id}
                className={`flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.15s] ${index !== availabilitySlots.length - 1 ? "pb-4 border-b" : ""} ${index !== 0 ? "pt-4" : ""}`}
              >
                <div className="flex w-full min-w-0 flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
                      {slot.day}
                    </h3>
                    <div
                      className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold ${slot.recurring ? "bg-blue-100 text-blue-800 border-transparent" : "bg-gray-100 text-gray-800 border-transparent"}`}
                    >
                      {slot.recurring ? "Recurring" : "One-time"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
                    <span>Time: {slot.time}</span>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                      Edit
                    </button>
                    <button className="text-sm normal-case bg-red-50 text-red-600 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-red-100 m-0 px-3 py-0 rounded-md [appearance:button]">
                      Remove
                    </button>
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
