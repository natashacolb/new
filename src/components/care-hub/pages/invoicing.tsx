import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Download, Eye } from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  agency: string;
  amount: string;
  date: string;
  dueDate: string;
  status: "Pending" | "Paid" | "Overdue";
}

export function Invoicing() {
  const invoices: Invoice[] = [
    {
      id: "invoice-1",
      invoiceNumber: "INV-12345",
      agency: "Care Staffing Solutions",
      amount: "£2,450.00",
      date: "01 Apr 2024",
      dueDate: "15 Apr 2024",
      status: "Pending",
    },
    {
      id: "invoice-2",
      invoiceNumber: "INV-12346",
      agency: "Healthcare Professionals",
      amount: "£1,875.50",
      date: "02 Apr 2024",
      dueDate: "16 Apr 2024",
      status: "Pending",
    },
    {
      id: "invoice-3",
      invoiceNumber: "INV-12347",
      agency: "Nursing Staff Direct",
      amount: "£3,120.75",
      date: "03 Apr 2024",
      dueDate: "17 Apr 2024",
      status: "Pending",
    },
    {
      id: "invoice-4",
      invoiceNumber: "INV-12340",
      agency: "Care Staffing Solutions",
      amount: "£2,150.00",
      date: "15 Mar 2024",
      dueDate: "29 Mar 2024",
      status: "Paid",
    },
    {
      id: "invoice-5",
      invoiceNumber: "INV-12341",
      agency: "Healthcare Professionals",
      amount: "£1,950.25",
      date: "18 Mar 2024",
      dueDate: "01 Apr 2024",
      status: "Paid",
    },
    {
      id: "invoice-6",
      invoiceNumber: "INV-12342",
      agency: "Nursing Staff Direct",
      amount: "£2,875.50",
      date: "10 Mar 2024",
      dueDate: "24 Mar 2024",
      status: "Overdue",
    },
  ];

  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "Pending",
  );
  const paidInvoices = invoices.filter((invoice) => invoice.status === "Paid");
  const overdueInvoices = invoices.filter(
    (invoice) => invoice.status === "Overdue",
  );

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-50 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-green-500 dark:text-green-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0">
                  Invoice Processing and Payments
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  Process payments from care agency
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending" className="relative">
                Pending
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                  {pendingInvoices.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="paid" className="relative">
                Paid
                {paidInvoices.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                    {paidInvoices.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="overdue" className="relative">
                Overdue
                {overdueInvoices.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {overdueInvoices.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-0">
              <div className="space-y-4">
                {pendingInvoices.map((invoice) => (
                  <InvoiceCard key={invoice.id} invoice={invoice} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="paid" className="mt-0">
              <div className="space-y-4">
                {paidInvoices.map((invoice) => (
                  <InvoiceCard key={invoice.id} invoice={invoice} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="overdue" className="mt-0">
              <div className="space-y-4">
                {overdueInvoices.map((invoice) => (
                  <InvoiceCard key={invoice.id} invoice={invoice} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function InvoiceCard({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300">
      <div className="flex w-full min-w-0 flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
            Temp Worker Staff Invoice #{invoice.invoiceNumber}
          </h3>
          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold text-slate-900">
              {invoice.amount}
            </div>
            <div
              className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold ${invoice.status === "Pending" ? "bg-blue-100 text-blue-800 border-transparent" : invoice.status === "Paid" ? "bg-green-100 text-green-800 border-transparent" : "bg-red-100 text-red-800 border-transparent"}`}
            >
              {invoice.status}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
          <span>Invoice: {invoice.invoiceNumber}</span>
        </div>
        <div className="flex w-full min-w-0 items-center gap-4 mt-1 mb-0 text-sm">
          <div className="flex items-center">
            <span className="font-medium">Date:</span>
            <span className="ml-1">{invoice.date}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Due:</span>
            <span className="ml-1">{invoice.dueDate}</span>
          </div>
        </div>
        <div className="flex justify-end items-center mt-2">
          <div className="flex gap-2">
            <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
              <Eye className="h-4 w-4 mr-1" />
              View
            </button>
            <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
            {invoice.status === "Pending" && (
              <button className="text-sm normal-case bg-green-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-green-600 m-0 px-3 py-0 rounded-md [appearance:button]">
                Mark as Paid
              </button>
            )}
            {invoice.status === "Overdue" && (
              <button className="text-sm normal-case bg-green-500 text-white cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-green-600 m-0 px-3 py-0 rounded-md [appearance:button]">
                Mark as Paid
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
