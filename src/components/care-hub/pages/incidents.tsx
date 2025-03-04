import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Plus } from "lucide-react";

interface Incident {
  id: string;
  title: string;
  worker: string;
  workerId: string;
  date: string;
  time: string;
  reporter: string;
  status: "New" | "Under Investigation" | "Resolved" | "Closed";
  severity: "Low" | "Medium" | "High" | "Critical";
  incidentId: string;
}

export function Incidents() {
  const incidents: Incident[] = [
    {
      id: "incident-1",
      title: "Medication Error",
      worker: "John Doe",
      workerId: "CW-001",
      date: "Mon, 15 Apr",
      time: "10:30",
      reporter: "Sarah Williams",
      status: "New",
      severity: "Medium",
      incidentId: "INC-12345",
    },
    {
      id: "incident-2",
      title: "Patient Fall",
      worker: "Jane Smith",
      workerId: "CW-002",
      date: "Wed, 17 Apr",
      time: "14:15",
      reporter: "David Thompson",
      status: "New",
      severity: "High",
      incidentId: "INC-67890",
    },
    {
      id: "incident-3",
      title: "Equipment Malfunction",
      worker: "Alex Johnson",
      workerId: "CW-003",
      date: "Tue, 16 Apr",
      time: "09:45",
      reporter: "Lisa Parker",
      status: "Under Investigation",
      severity: "Medium",
      incidentId: "INC-34567",
    },
    {
      id: "incident-4",
      title: "Staff Injury",
      worker: "Michael Brown",
      workerId: "CW-005",
      date: "Mon, 15 Apr",
      time: "16:20",
      reporter: "James Wilson",
      status: "Under Investigation",
      severity: "High",
      incidentId: "INC-45678",
    },
    {
      id: "incident-5",
      title: "Missing Medication",
      worker: "Emily Davis",
      workerId: "CW-006",
      date: "Sun, 14 Apr",
      time: "11:10",
      reporter: "Thomas Anderson",
      status: "Resolved",
      severity: "High",
      incidentId: "INC-23456",
    },
    {
      id: "incident-6",
      title: "Visitor Complaint",
      worker: "Robert Wilson",
      workerId: "CW-007",
      date: "Sat, 13 Apr",
      time: "13:30",
      reporter: "Jennifer Lewis",
      status: "Closed",
      severity: "Low",
      incidentId: "INC-78901",
    },
  ];

  const newIncidents = incidents.filter(
    (incident) => incident.status === "New",
  );
  const underInvestigationIncidents = incidents.filter(
    (incident) => incident.status === "Under Investigation",
  );
  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === "Resolved",
  );
  const closedIncidents = incidents.filter(
    (incident) => incident.status === "Closed",
  );

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-red-50 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0">
                  Incident Log
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  Track and manage workplace incidents
                </CardDescription>
              </div>
            </div>
            <button className="text-sm normal-case bg-blue-500 text-white cursor-pointer inline-flex h-9 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-blue-600 m-0 px-3 py-0 rounded-md [appearance:button]">
              <Plus className="h-4 w-4 mr-2" />
              Report Incident
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="new" className="relative">
                New
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {newIncidents.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="investigating" className="relative">
                Investigating
                {underInvestigationIncidents.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">
                    {underInvestigationIncidents.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="resolved" className="relative">
                Resolved
                {resolvedIncidents.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                    {resolvedIncidents.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="closed" className="relative">
                Closed
                {closedIncidents.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center">
                    {closedIncidents.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="mt-0">
              <div className="space-y-4">
                {newIncidents.map((incident) => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="investigating" className="mt-0">
              <div className="space-y-4">
                {underInvestigationIncidents.map((incident) => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resolved" className="mt-0">
              <div className="space-y-4">
                {resolvedIncidents.map((incident) => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="closed" className="mt-0">
              <div className="space-y-4">
                {closedIncidents.map((incident) => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <div className="flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300">
      <div className="flex w-full min-w-0 flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
            {incident.title}
          </h3>
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold ${incident.status === "New" ? "bg-red-100 text-red-800 border-transparent" : incident.status === "Under Investigation" ? "bg-yellow-100 text-yellow-800 border-transparent" : incident.status === "Resolved" ? "bg-green-100 text-green-800 border-transparent" : "bg-gray-100 text-gray-800 border-transparent"}`}
            >
              {incident.status}
            </div>
            <div
              className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold ${incident.severity === "Low" ? "bg-blue-100 text-blue-800 border-transparent" : incident.severity === "Medium" ? "bg-yellow-100 text-yellow-800 border-transparent" : incident.severity === "High" ? "bg-orange-100 text-orange-800 border-transparent" : "bg-red-100 text-red-800 border-transparent"}`}
            >
              {incident.severity} Severity
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
          <span>Care Worker: {incident.worker}</span>
          <span>•</span>
          <span>Worker ID: {incident.workerId}</span>
          <span>•</span>
          <span>ID: {incident.incidentId}</span>
          <span>•</span>
          <span>Reported by: {incident.reporter}</span>
        </div>
        <div className="flex w-full min-w-0 items-center gap-4 mt-1 mb-0 text-sm">
          <div className="flex items-center">
            <span className="font-medium">Date:</span>
            <span className="ml-1">{incident.date}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Time:</span>
            <span className="ml-1">{incident.time}</span>
          </div>
        </div>
        <div className="flex justify-end items-center mt-2">
          {incident.status === "New" && (
            <div className="flex gap-2">
              <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                View Details
              </button>
              <button className="text-sm normal-case bg-yellow-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-yellow-600 m-0 px-3 py-0 rounded-md [appearance:button]">
                Start Investigation
              </button>
            </div>
          )}
          {incident.status === "Under Investigation" && (
            <div className="flex gap-2">
              <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                View Details
              </button>
              <button className="text-sm normal-case bg-green-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-green-600 m-0 px-3 py-0 rounded-md [appearance:button]">
                Mark as Resolved
              </button>
            </div>
          )}
          {incident.status === "Resolved" && (
            <div className="flex gap-2">
              <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                View Details
              </button>
              <button className="text-sm normal-case bg-gray-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-gray-600 m-0 px-3 py-0 rounded-md [appearance:button]">
                Close Incident
              </button>
            </div>
          )}
          {incident.status === "Closed" && (
            <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
