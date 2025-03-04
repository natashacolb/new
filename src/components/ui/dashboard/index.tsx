import { Clock, Calendar, CreditCard, Bell } from "lucide-react";
import { AnalyticCard } from "./analytics-card";
import { UpcomingShifts } from "./upcoming-shifts";
import { RecentActivity } from "./recent-activity";

export function Dashboard() {
  return (
    <div className="pt-0">
      {/* Analytics Cards */}
      <div className="grid gap-4 mb-0 md:grid-cols-[repeat(2,minmax(0px,1fr))] lg:grid-cols-[repeat(4,minmax(0px,1fr))]">
        <AnalyticCard
          title="Upcoming Shifts"
          value="3"
          subtext="Next shift in 2 days"
          icon={Clock}
          iconColor="text-blue-500"
          iconBgColor="bg-blue-50"
        />
        <AnalyticCard
          title="Hours This Month"
          value="48"
          subtext="+12 hours from last month"
          icon={Calendar}
          iconColor="text-green-500"
          iconBgColor="bg-green-50"
        />
        <AnalyticCard
          title="Earnings"
          value="£1,250"
          subtext="This month"
          icon={CreditCard}
          iconColor="text-purple-500"
          iconBgColor="bg-purple-50"
        />
        <AnalyticCard
          title="Notifications"
          value="5"
          subtext="2 notifications need attention"
          icon={Bell}
          iconColor="text-red-500"
          iconBgColor="bg-red-50"
        />
      </div>

      {/* Upcoming Shifts and Recent Activity */}
      <div className="grid grid-cols-[repeat(1,minmax(0px,1fr))] gap-4 mt-4 mb-0 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
        <UpcomingShifts shifts={[]} />
        <RecentActivity activities={[]} />
      </div>
    </div>
  );
}
