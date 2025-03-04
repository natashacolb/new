import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ClipboardCheck, Upload, AlertCircle } from "lucide-react";

interface Document {
  id: string;
  name: string;
  status: "Valid" | "Expiring Soon" | "Expired";
  expiryDate: string;
}

export function Compliance() {
  const documents: Document[] = [
    {
      id: "doc-1",
      name: "NMC Registration",
      status: "Valid",
      expiryDate: "15 Jan 2025",
    },
    {
      id: "doc-2",
      name: "DBS Certificate",
      status: "Valid",
      expiryDate: "22 Mar 2025",
    },
    {
      id: "doc-3",
      name: "Right to Work",
      status: "Valid",
      expiryDate: "Permanent",
    },
    {
      id: "doc-4",
      name: "Mandatory Training",
      status: "Expiring Soon",
      expiryDate: "30 Apr 2024",
    },
    {
      id: "doc-5",
      name: "Professional Indemnity Insurance",
      status: "Valid",
      expiryDate: "12 Dec 2024",
    },
  ];

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6 md:p-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-lg">
                <ClipboardCheck className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0 md:text-2xl text-xl md:leading-none leading-7">
                  Compliance
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  Manage your professional documents and certifications
                </CardDescription>
              </div>
            </div>
            <button className="text-sm normal-case bg-blue-500 text-white cursor-pointer inline-flex h-9 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-blue-600 m-0 px-3 py-0 rounded-md [appearance:button]">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {documents.map((document, index) => (
              <div
                key={document.id}
                className={`flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.15s] ${index !== documents.length - 1 ? "pb-4 border-b" : ""} ${index !== 0 ? "pt-4" : ""}`}
              >
                <div className="flex w-full min-w-0 flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
                      {document.name}
                    </h3>
                    <div
                      className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold ${document.status === "Valid" ? "bg-green-100 text-green-800 border-transparent" : document.status === "Expiring Soon" ? "bg-yellow-100 text-yellow-800 border-transparent" : "bg-red-100 text-red-800 border-transparent"}`}
                    >
                      {document.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
                    <span>Expires: {document.expiryDate}</span>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                      View Document
                    </button>
                    {document.status === "Expiring Soon" && (
                      <button className="text-sm normal-case bg-yellow-50 text-yellow-600 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-yellow-100 m-0 px-3 py-0 rounded-md [appearance:button]">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Renew Now
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
