import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ClipboardCheck } from "lucide-react";

interface Activity {
  id: string;
  type: string;
  details: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities?: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  // Default activities if none provided
  const defaultActivities: Activity[] = [
    {
      id: "activity-1",
      type: "Timesheet Approved",
      details: "Week ending 7th April",
      timestamp: "2 hours ago",
    },
    {
      id: "activity-2",
      type: "Shift Booked",
      details: "Sunrise Care Home - Mon, 15 Apr",
      timestamp: "5 hours ago",
    },
    {
      id: "activity-3",
      type: "Payment Received",
      details: "£625 - March Week 4",
      timestamp: "1 day ago",
    },
  ];

  const displayActivities = activities?.length ? activities : defaultActivities;

  return (
    <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
      <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6 md:p-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-lg">
              <ClipboardCheck className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div className="ml-2 mr-0">
              <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0 md:text-2xl text-xl md:leading-none leading-7">
                Recent Activity
              </CardTitle>
              <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                Your recent professional activities
              </CardDescription>
            </div>
          </div>
          <a href="/activity">
            <button className="text-sm normal-case bg-transparent bg-none cursor-pointer inline-flex h-9 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] m-0 px-3 py-0 rounded-md [appearance:button]">
              View all
            </button>
          </a>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-6 px-6 md:px-6 md:pb-6 p-4">
        <div className="space-y-4">
          {displayActivities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.15s] ${index === 0 ? "" : "mt-4 mb-0"} ${index !== displayActivities.length - 1 ? "pb-4 rounded-lg border-b" : "border-0"} md:p-4`}
            >
              <div className="flex w-full min-w-0 flex-col">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
                    {activity.type}
                  </h3>
                  <div className="text-xs text-slate-500">
                    {activity.timestamp}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
                  <span>{activity.details}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
