import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  CreditCard,
  FileText,
  User,
  Settings,
  Building,
  Search,
  Bell,
} from "lucide-react";

export function CareWorkerPortal() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="h-16 border-b border-slate-200 bg-white px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 font-bold text-xl">Care Worker Portal</div>
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search shifts, timesheets, or facilities..."
              className="h-9 w-80 rounded-md border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-sm font-medium text-slate-700">
            Welcome, John Doe
          </div>
          <button className="text-slate-500 hover:text-slate-700 transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>

      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Care Worker Dashboard
            </h1>
            <p className="text-slate-500 mt-1">Welcome back, John Doe</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
              <User className="h-5 w-5 mr-2" />
              <span className="font-medium">Registered Nurse</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Upcoming Shifts"
            value="3"
            description="Next: Tomorrow, 07:00"
            icon={<Calendar className="h-5 w-5 text-blue-500" />}
            color="bg-blue-50"
          />
          <DashboardCard
            title="Hours This Month"
            value="64"
            description="£1,920 earned"
            icon={<Clock className="h-5 w-5 text-green-500" />}
            color="bg-green-50"
          />
          <DashboardCard
            title="Pending Timesheets"
            value="2"
            description="Awaiting approval"
            icon={<FileText className="h-5 w-5 text-yellow-500" />}
            color="bg-yellow-50"
          />
          <DashboardCard
            title="Next Payment"
            value="£960"
            description="Due on 30 Apr"
            icon={<CreditCard className="h-5 w-5 text-purple-500" />}
            color="bg-purple-50"
          />
        </div>

        <Tabs defaultValue="shifts" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="shifts">My Shifts</TabsTrigger>
            <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
            <TabsTrigger value="available">Available Shifts</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="shifts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Shifts</CardTitle>
                <CardDescription>
                  Your scheduled shifts for the next 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <ShiftCard
                      key={index}
                      facility={
                        index === 0
                          ? "Sunrise Care Home"
                          : index === 1
                            ? "Meadow View Care"
                            : "Oakwood Nursing Home"
                      }
                      date={
                        index === 0
                          ? "Tomorrow"
                          : index === 1
                            ? "Wed, 17 Apr"
                            : "Fri, 19 Apr"
                      }
                      time={
                        index === 0
                          ? "07:00 - 19:00"
                          : index === 1
                            ? "19:00 - 07:00"
                            : "07:00 - 19:00"
                      }
                      status="Confirmed"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timesheets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Timesheets</CardTitle>
                <CardDescription>
                  Your submitted timesheets and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((_, index) => (
                    <TimesheetCard
                      key={index}
                      facility={
                        index === 0
                          ? "Sunrise Care Home"
                          : index === 1
                            ? "Meadow View Care"
                            : index === 2
                              ? "Oakwood Nursing Home"
                              : "Sunrise Care Home"
                      }
                      date={
                        index === 0
                          ? "Mon, 15 Apr"
                          : index === 1
                            ? "Sun, 14 Apr"
                            : index === 2
                              ? "Sat, 13 Apr"
                              : "Fri, 12 Apr"
                      }
                      hours={"12"}
                      status={
                        index < 2
                          ? "Pending"
                          : index === 2
                            ? "Approved"
                            : "Paid"
                      }
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Shifts</CardTitle>
                <CardDescription>
                  Shifts that match your qualifications and availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((_, index) => (
                    <AvailableShiftCard
                      key={index}
                      facility={
                        index === 0
                          ? "Sunrise Care Home"
                          : index === 1
                            ? "Meadow View Care"
                            : index === 2
                              ? "Oakwood Nursing Home"
                              : "Cedar House Care"
                      }
                      date={
                        index === 0
                          ? "Thu, 18 Apr"
                          : index === 1
                            ? "Fri, 19 Apr"
                            : index === 2
                              ? "Sat, 20 Apr"
                              : "Sun, 21 Apr"
                      }
                      time={
                        index === 0
                          ? "07:00 - 19:00"
                          : index === 1
                            ? "19:00 - 07:00"
                            : index === 2
                              ? "07:00 - 19:00"
                              : "19:00 - 07:00"
                      }
                      rate={
                        index === 0
                          ? "£25/hr"
                          : index === 1
                            ? "£30/hr"
                            : index === 2
                              ? "£25/hr"
                              : "£30/hr"
                      }
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>
                  Your personal and professional information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-slate-500">Full Name</p>
                        <p className="font-medium">John Doe</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Email</p>
                        <p className="font-medium">john.doe@example.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Phone</p>
                        <p className="font-medium">07123456789</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Address</p>
                        <p className="font-medium">
                          123 Main Street, London, SW1A 1AA
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Professional Details
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-slate-500">Role</p>
                        <p className="font-medium">Registered Nurse</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">NMC Number</p>
                        <p className="font-medium">12A3456B</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">
                          DBS Certificate
                        </p>
                        <p className="font-medium">001234567890</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Experience</p>
                        <p className="font-medium">5-10 years</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      <Settings className="h-4 w-4 mr-1" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

function DashboardCard({
  title,
  value,
  description,
  icon,
  color,
}: DashboardCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          </div>
          <div className={`p-2 rounded-full ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ShiftCardProps {
  facility: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Completed";
}

function ShiftCard({ facility, date, time, status }: ShiftCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-medium">{facility}</h3>
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
          <span>{date}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {status}
        </span>
        <button className="text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}

interface TimesheetCardProps {
  facility: string;
  date: string;
  hours: string;
  status: "Pending" | "Approved" | "Paid" | "Rejected";
}

function TimesheetCard({ facility, date, hours, status }: TimesheetCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Paid":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-medium">{facility}</h3>
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
          <span>{date}</span>
          <span>•</span>
          <span>{hours} hours</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}
        >
          {status}
        </span>
        <button className="text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-md hover:bg-slate-200 transition-colors">
          View
        </button>
      </div>
    </div>
  );
}

interface AvailableShiftCardProps {
  facility: string;
  date: string;
  time: string;
  rate: string;
}

function AvailableShiftCard({
  facility,
  date,
  time,
  rate,
}: AvailableShiftCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-medium">{facility}</h3>
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
          <span>{date}</span>
          <span>•</span>
          <span>{time}</span>
          <span>•</span>
          <span>{rate}</span>
        </div>
      </div>
      <div>
        <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors">
          Apply
        </button>
      </div>
    </div>
  );
}
