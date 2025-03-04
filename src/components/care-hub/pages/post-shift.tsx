import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, Plus, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export function PostShift() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(0);
  const [payRate, setPayRate] = useState(0);
  const [totalPay, setTotalPay] = useState(0);

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`2000-01-01T${startTime}:00`);
      const end = new Date(`2000-01-01T${endTime}:00`);

      // If end time is earlier than start time, assume it's the next day
      let diff = end.getTime() - start.getTime();
      if (diff < 0) {
        diff += 24 * 60 * 60 * 1000; // Add 24 hours
      }

      const hours = diff / (1000 * 60 * 60);
      setDuration(hours);

      if (payRate) {
        setTotalPay(hours * payRate);
      }
    }
  }, [startTime, endTime, payRate]);
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
                  Post New Shift
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  Create a new shift for care workers to apply
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Role Required</label>
                <select className="w-full h-10 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Role</option>
                  <option value="nurse">Registered Nurse</option>
                  <option value="care-assistant">Care Assistant</option>
                  <option value="senior-carer">Senior Carer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="w-full h-10 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Start Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Clock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full h-10 pl-10 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Clock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full h-10 pl-10 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration (hours)</label>
                <input
                  type="text"
                  value={duration ? duration.toFixed(2) : ""}
                  readOnly
                  className="w-full h-10 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pay Rate (£/hr)</label>
                <input
                  type="number"
                  placeholder="25.00"
                  value={payRate || ""}
                  onChange={(e) => setPayRate(parseFloat(e.target.value) || 0)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Total Shift Pay (£)
                </label>
                <input
                  type="text"
                  value={totalPay ? `£${totalPay.toFixed(2)}` : ""}
                  readOnly
                  className="w-full h-10 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Number of Positions
                </label>
                <input
                  type="number"
                  placeholder="1"
                  min="1"
                  className="w-full h-10 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Requirements</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Medication Trained</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">PMVA Trained</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Uniform Required</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Driving License Required</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Notes</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any specific requirements or information about this shift..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-9 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-4 py-0 rounded-md [appearance:button] mr-2"
              >
                Cancel
              </button>
              <button
                type="button"
                className="text-sm normal-case bg-blue-500 text-white cursor-pointer inline-flex h-9 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-blue-600 m-0 px-4 py-0 rounded-md [appearance:button]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post Shift
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
