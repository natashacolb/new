import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  HelpCircle,
} from "lucide-react";

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function Settings() {
  const settingSections: SettingSection[] = [
    {
      id: "section-1",
      title: "Profile Settings",
      description: "Update your personal information and preferences",
      icon: <User className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "section-2",
      title: "Security & Access",
      description: "Manage account security, passwords and access controls",
      icon: <Shield className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "section-3",
      title: "Notification Preferences",
      description: "Configure how and when you receive notifications",
      icon: <Bell className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "section-4",
      title: "Help & Support",
      description: "Get help with using the platform and contact support",
      icon: <HelpCircle className="h-5 w-5 text-blue-500" />,
    },
  ];

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6 md:p-6 p-4">
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-lg">
              <SettingsIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div className="ml-2 mr-0">
              <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0 md:text-2xl text-xl md:leading-none leading-7">
                Settings
              </CardTitle>
              <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                Manage your account and platform settings
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {settingSections.map((section) => (
              <div
                key={section.id}
                className="flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300"
              >
                <div className="flex items-center">
                  <div className="bg-blue-50 p-2 rounded-lg mr-4">
                    {section.icon}
                  </div>
                  <div>
                    <h4 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
                      {section.title}
                    </h4>
                    <p className="text-sm leading-5 text-neutral-500 mt-1 mb-0">
                      {section.description}
                    </p>
                  </div>
                </div>
                <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                  Manage
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
