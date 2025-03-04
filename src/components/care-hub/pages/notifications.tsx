import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Bell, Check, X } from "lucide-react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
  category: "Shifts" | "Timesheets" | "Workers" | "Incidents" | "System";
}

export function Notifications() {
  const notificationSettings: NotificationSetting[] = [
    {
      id: "notification-1",
      title: "New Shift Applications",
      description: "Receive notifications when care workers apply for shifts",
      email: true,
      push: true,
      sms: false,
      category: "Shifts",
    },
    {
      id: "notification-2",
      title: "Shift Cancellations",
      description: "Receive notifications when shifts are cancelled",
      email: true,
      push: true,
      sms: true,
      category: "Shifts",
    },
    {
      id: "notification-3",
      title: "Timesheet Submissions",
      description: "Receive notifications when timesheets are submitted",
      email: true,
      push: true,
      sms: false,
      category: "Timesheets",
    },
    {
      id: "notification-4",
      title: "New Care Workers",
      description: "Receive notifications when new care workers are available",
      email: true,
      push: false,
      sms: false,
      category: "Workers",
    },
    {
      id: "notification-5",
      title: "Incident Reports",
      description: "Receive notifications when new incidents are reported",
      email: true,
      push: true,
      sms: true,
      category: "Incidents",
    },
    {
      id: "notification-6",
      title: "System Updates",
      description: "Receive notifications about system updates and maintenance",
      email: true,
      push: false,
      sms: false,
      category: "System",
    },
  ];

  const shiftNotifications = notificationSettings.filter(
    (setting) => setting.category === "Shifts",
  );
  const timesheetNotifications = notificationSettings.filter(
    (setting) => setting.category === "Timesheets",
  );
  const workerNotifications = notificationSettings.filter(
    (setting) => setting.category === "Workers",
  );
  const incidentNotifications = notificationSettings.filter(
    (setting) => setting.category === "Incidents",
  );
  const systemNotifications = notificationSettings.filter(
    (setting) => setting.category === "System",
  );

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Bell className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0">
                  Notification Settings
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  Manage how you receive notifications
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Shifts Notifications */}
            <div>
              <h3 className="text-lg font-medium mb-4">Shift Notifications</h3>
              <div className="space-y-4">
                {shiftNotifications.map((setting) => (
                  <NotificationSettingCard key={setting.id} setting={setting} />
                ))}
              </div>
            </div>

            {/* Timesheet Notifications */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                Timesheet Notifications
              </h3>
              <div className="space-y-4">
                {timesheetNotifications.map((setting) => (
                  <NotificationSettingCard key={setting.id} setting={setting} />
                ))}
              </div>
            </div>

            {/* Worker Notifications */}
            <div>
              <h3 className="text-lg font-medium mb-4">Worker Notifications</h3>
              <div className="space-y-4">
                {workerNotifications.map((setting) => (
                  <NotificationSettingCard key={setting.id} setting={setting} />
                ))}
              </div>
            </div>

            {/* Incident Notifications */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                Incident Notifications
              </h3>
              <div className="space-y-4">
                {incidentNotifications.map((setting) => (
                  <NotificationSettingCard key={setting.id} setting={setting} />
                ))}
              </div>
            </div>

            {/* System Notifications */}
            <div>
              <h3 className="text-lg font-medium mb-4">System Notifications</h3>
              <div className="space-y-4">
                {systemNotifications.map((setting) => (
                  <NotificationSettingCard key={setting.id} setting={setting} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationSettingCard({
  setting,
}: {
  setting: NotificationSetting;
}) {
  return (
    <div className="flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300">
      <div className="flex-1">
        <h4 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
          {setting.title}
        </h4>
        <p className="text-sm leading-5 text-neutral-500 mt-1 mb-0">
          {setting.description}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-500 mb-1">Email</span>
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center ${setting.email ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}`}
          >
            {setting.email ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-500 mb-1">Push</span>
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center ${setting.push ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}`}
          >
            {setting.push ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-500 mb-1">SMS</span>
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center ${setting.sms ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}`}
          >
            {setting.sms ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
