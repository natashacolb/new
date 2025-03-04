import { Navigation } from "./navigation";

export function AppNavigation() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NavigationCard
            title="Care Worker Registration"
            description="Register as a care worker to join our platform"
            link="/care-worker-registration"
            icon="UserPlus"
          />
          <NavigationCard
            title="Care Worker Dashboard"
            description="Access your shifts, timesheets, and profile"
            link="/care-worker-dashboard"
            icon="LayoutDashboard"
          />
          <NavigationCard
            title="Care Hub Dashboard"
            description="Manage care facilities, shifts, and workers"
            link="/care-hub"
            icon="Building"
          />
        </div>
      </div>
    </div>
  );
}

interface NavigationCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

function NavigationCard({
  title,
  description,
  link,
  icon,
}: NavigationCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "UserPlus":
        return (
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="16" x2="22" y1="11" y2="11" />
            </svg>
          </div>
        );
      case "LayoutDashboard":
        return (
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            >
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
          </div>
        );
      case "Building":
        return (
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
              <path d="M9 22v-4h6v4" />
              <path d="M8 6h.01" />
              <path d="M16 6h.01" />
              <path d="M12 6h.01" />
              <path d="M12 10h.01" />
              <path d="M12 14h.01" />
              <path d="M16 10h.01" />
              <path d="M16 14h.01" />
              <path d="M8 10h.01" />
              <path d="M8 14h.01" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <a href={link} className="block">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 h-full border border-slate-200">
        <div className="flex items-start space-x-4">
          {getIcon()}
          <div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-slate-600">{description}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
