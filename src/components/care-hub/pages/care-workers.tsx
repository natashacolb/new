import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Users, Search, Star, Calendar } from "lucide-react";

interface CareWorker {
  id: string;
  name: string;
  workerId: string;
  role: string;
  lastShift: string;
  rating: number;
  shifts: number;
  favorite: boolean;
}

export function CareWorkers() {
  const careWorkers: CareWorker[] = [
    {
      id: "worker-1",
      name: "John Doe",
      workerId: "CW-001",
      role: "Registered Nurse",
      lastShift: "2 days ago",
      rating: 4.8,
      shifts: 24,
      favorite: true,
    },
    {
      id: "worker-2",
      name: "Jane Smith",
      workerId: "CW-002",
      role: "Registered Nurse",
      lastShift: "Yesterday",
      rating: 4.9,
      shifts: 36,
      favorite: true,
    },
    {
      id: "worker-3",
      name: "Alex Johnson",
      workerId: "CW-003",
      role: "Registered Nurse",
      lastShift: "1 week ago",
      rating: 4.5,
      shifts: 18,
      favorite: false,
    },
    {
      id: "worker-4",
      name: "Michael Brown",
      workerId: "CW-005",
      role: "Care Assistant",
      lastShift: "3 days ago",
      rating: 4.7,
      shifts: 42,
      favorite: true,
    },
    {
      id: "worker-5",
      name: "Emily Davis",
      workerId: "CW-006",
      role: "Senior Carer",
      lastShift: "5 days ago",
      rating: 4.6,
      shifts: 30,
      favorite: false,
    },
    {
      id: "worker-6",
      name: "Robert Wilson",
      workerId: "CW-007",
      role: "Care Assistant",
      lastShift: "2 weeks ago",
      rating: 4.3,
      shifts: 15,
      favorite: false,
    },
  ];

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-50 p-2 rounded-lg">
                <Users className="h-5 w-5 text-green-500 dark:text-green-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0">
                  Care Workers
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  Manage your care worker preferences and assignments
                </CardDescription>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search care workers..."
                className="h-9 w-64 rounded-md border border-slate-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {careWorkers.map((worker) => (
              <div
                key={worker.id}
                className="flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300"
              >
                <div className="flex w-full min-w-0 items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
                        {worker.name}
                      </h3>
                      {worker.favorite && (
                        <Star className="h-4 w-4 text-yellow-500 ml-2 fill-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
                      <span>ID: {worker.workerId}</span>
                      <span>•</span>
                      <span>{worker.role}</span>
                      <span>•</span>
                      <span>Last shift: {worker.lastShift}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                        {worker.rating} ({worker.shifts} shifts)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                      View Profile
                    </button>
                    <button className="text-sm normal-case bg-blue-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-blue-600 m-0 px-3 py-0 rounded-md [appearance:button]">
                      <Calendar className="h-4 w-4 mr-1" />
                      Assign Shift
                    </button>
                    {!worker.favorite ? (
                      <button className="text-sm normal-case bg-yellow-50 text-yellow-600 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-yellow-100 m-0 px-3 py-0 rounded-md [appearance:button]">
                        <Star className="h-4 w-4" />
                      </button>
                    ) : (
                      <button className="text-sm normal-case bg-yellow-100 text-yellow-600 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-yellow-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                        <Star className="h-4 w-4 fill-yellow-600" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
