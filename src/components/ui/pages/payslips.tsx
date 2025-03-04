import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Receipt, Download } from "lucide-react";

interface Payslip {
  id: string;
  period: string;
  amount: string;
  date: string;
  reference: string;
}

export function Payslips() {
  const payslips: Payslip[] = [
    {
      id: "payslip-1",
      period: "March Week 4",
      amount: "£625.00",
      date: "12 Apr 2024",
      reference: "PAY-12345",
    },
    {
      id: "payslip-2",
      period: "March Week 3",
      amount: "£750.00",
      date: "5 Apr 2024",
      reference: "PAY-12344",
    },
    {
      id: "payslip-3",
      period: "March Week 2",
      amount: "£375.00",
      date: "29 Mar 2024",
      reference: "PAY-12343",
    },
    {
      id: "payslip-4",
      period: "March Week 1",
      amount: "£562.50",
      date: "22 Mar 2024",
      reference: "PAY-12342",
    },
  ];

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6 md:p-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Receipt className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0 md:text-2xl text-xl md:leading-none leading-7">
                  Payslips
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  View and download your payment records
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {payslips.map((payslip, index) => (
              <div
                key={payslip.id}
                className={`flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.15s] ${index !== payslips.length - 1 ? "pb-4 border-b" : ""} ${index !== 0 ? "pt-4" : ""}`}
              >
                <div className="flex w-full min-w-0 flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
                      {payslip.period}
                    </h3>
                    <div className="text-green-600 font-semibold">
                      {payslip.amount}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
                    <span>Payment date: {payslip.date}</span>
                    <span>•</span>
                    <span>Ref: {payslip.reference}</span>
                  </div>
                  <div className="mt-2">
                    <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
                      <Download className="h-4 w-4 mr-1" />
                      Download PDF
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
