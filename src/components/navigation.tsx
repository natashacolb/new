import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, LayoutDashboard, Building, User } from "lucide-react";

export function Navigation() {
  return (
    <div className="w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Care Connect</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2"
            >
              <Link to="/care-worker-registration">
                <UserPlus className="h-4 w-4" />
                Care Worker Registration
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2"
            >
              <Link to="/care-worker-portal">
                <User className="h-4 w-4" />
                Care Worker Portal
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2"
            >
              <Link to="/care-worker-dashboard">
                <LayoutDashboard className="h-4 w-4" />
                Care Worker Dashboard
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2"
            >
              <Link to="/care-hub">
                <Building className="h-4 w-4" />
                Care Hub Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
