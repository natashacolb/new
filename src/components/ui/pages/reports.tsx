import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart, Download, Calendar } from "lucide-react";

interface Report {
  id: string;
  name: string;
  description: string;
  lastGenerated: string;
}

export function Reports() {
  const reports: Report[] = [
    {
      id: "report-1",
      name: "Hours Summary",
      description: "Summary of hours worked by month",
      lastGenerated: "12 Apr 2024",
    },
    {
      id: "report-2",
      name: "Earnings Report",
      description: "Breakdown of earnings by facility and period",
      lastGenerated: "12 Apr 2024",
    },
    {
      id: "report-3",
      name: "Shift Pattern Analysis",
      description: "Analysis of your shift patterns and preferences",
      lastGenerated: "5 Apr 2024",
    },
    {
      id: "report-4",
      name: "Annual Summary",
      description: "Year-to-date summary of all professional activity",
      lastGenerated: "31 Mar 2024",
    },
  ];

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6 md:p-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-lg">
                <BarChart className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0 md:text-2xl text-xl md:leading-none leading-7">
                  Reports
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  View and download your performance reports
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 p-4 border border-slate-200 rounded-lg bg-slate-50">
            <h3 className="text-lg font-medium mb-4">Generate Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <select className="w-full h-10 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Report Type</option>
                  <option value="hours-summary">Hours Summary</option>
                  <option value="earnings-report">Earnings Report</option>
                  <option value="shift-pattern">Shift Pattern Analysis</option>
                  <option value="annual-summary">Annual Summary</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">From Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="date"
                    className="w-full h-10 pl-10 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">To Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="date"
                    className="w-full h-10 pl-10 px-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="text-sm normal-case bg-blue-500 text-white cursor-pointer inline-flex h-9 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-blue-600 m-0 px-4 py-0 rounded-md [appearance:button]">
                Generate Report
              </button>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-4">Recent Reports</h3>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300"
              >
                <div className="flex w-full min-w-0 flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
                      {report.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
                    <span>{report.description}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
                    <span>Last generated: {report.lastGenerated}</span>
                  </div>
                  <div className="flex justify-end items-center mt-2">
                    <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
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
