import { UserPlus, LayoutDashboard, Building, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function NavigationPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-white shadow-lg border-2">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              Care Connect
            </h1>
            <p className="text-slate-600">Healthcare staffing platform</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <NavigationButton
              title="Care Worker Registration"
              description="Register as a care worker to join our platform"
              link="/care-worker-registration"
              icon={<UserPlus className="h-5 w-5" />}
              color="bg-blue-100 text-blue-600 hover:bg-blue-200"
            />

            <NavigationButton
              title="Care Worker Dashboard"
              description="Access your shifts, timesheets, and profile"
              link="/care-worker-dashboard"
              icon={<LayoutDashboard className="h-5 w-5" />}
              color="bg-teal-100 text-teal-600 hover:bg-teal-200"
            />

            <NavigationButton
              title="Care Hub Dashboard"
              description="Manage care facilities, shifts, and workers"
              link="/care-hub"
              icon={<Building className="h-5 w-5" />}
              color="bg-purple-100 text-purple-600 hover:bg-purple-200"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface NavigationButtonProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  color: string;
}

function NavigationButton({
  title,
  description,
  link,
  icon,
  color,
}: NavigationButtonProps) {
  return (
    <a href={link} className="block">
      <div
        className={`rounded-lg p-4 transition-all duration-300 ${color} flex items-center`}
      >
        <div className="mr-4">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm opacity-80">{description}</p>
        </div>
      </div>
    </a>
  );
}
