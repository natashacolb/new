import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, X } from "lucide-react";

interface Booking {
  id: string;
  facility: string;
  role: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  reference: string;
}

export function MyBookings() {
  const bookings: Booking[] = [
    {
      id: "booking-1",
      facility: "Sunrise Care Home",
      role: "Registered Nurse",
      date: "Mon, 15 Apr",
      time: "07:00 - 19:00",
      status: "Confirmed",
      reference: "SH-12345",
    },
    {
      id: "booking-2",
      facility: "Meadow View Care",
      role: "Registered Nurse",
      date: "Wed, 17 Apr",
      time: "08:00 - 20:00",
      status: "Pending",
      reference: "MV-67890",
    },
    {
      id: "booking-3",
      facility: "Oakwood Nursing Home",
      role: "Registered Nurse",
      date: "Fri, 12 Apr",
      time: "19:00 - 07:00",
      status: "Completed",
      reference: "ON-54321",
    },
    {
      id: "booking-4",
      facility: "Riverside Care Center",
      role: "Registered Nurse",
      date: "Sat, 13 Apr",
      time: "07:00 - 19:00",
      status: "Cancelled",
      reference: "RC-98765",
    },
  ];

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending",
  );
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed",
  );
  const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed",
  );
  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "Cancelled",
  );

  const renderBookingCard = (
    booking: Booking,
    index: number,
    filteredBookings: Booking[],
  ) => (
    <div
      key={booking.id}
      className={`flex w-full items-center justify-between border-neutral-200 transition-colors ease-in-out duration-[0.3s] ${index !== filteredBookings.length - 1 ? "mb-4" : ""} shadow-[0_0_5px_rgba(37,99,235,0.2)] hover:shadow-[0_0_8px_rgba(37,99,235,0.3)] rounded-lg p-4 border border-slate-300`}
    >
      <div className="flex w-full min-w-0 flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium transition-colors ease-in-out duration-[0.15s] m-0">
            {booking.facility}
          </h3>
          <div
            className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-semibold ${booking.status === "Confirmed" ? "bg-green-100 text-green-800 border-transparent" : booking.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-transparent" : booking.status === "Cancelled" ? "bg-red-100 text-red-800 border-transparent" : "bg-gray-100 text-gray-800 border-transparent"}`}
          >
            {booking.status}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm leading-5 text-neutral-500 mt-1 mb-0">
          <span>{booking.role}</span>
          <span>•</span>
          <span>Ref: {booking.reference}</span>
        </div>
        <div className="flex w-full min-w-0 items-center gap-4 mt-1 mb-0 text-sm">
          <div className="flex items-center">
            <span className="font-medium">Date:</span>
            <span className="ml-1">{booking.date}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Time:</span>
            <span className="ml-1">{booking.time}</span>
          </div>
        </div>
        <div className="flex justify-end items-center mt-2">
          {(booking.status === "Completed" ||
            booking.status === "Cancelled") && (
            <button className="text-sm normal-case bg-slate-100 text-slate-700 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-slate-200 m-0 px-3 py-0 rounded-md [appearance:button]">
              View Details
            </button>
          )}
          {(booking.status === "Confirmed" || booking.status === "Pending") && (
            <button className="text-sm normal-case bg-red-50 text-red-600 cursor-pointer inline-flex h-8 items-center justify-center whitespace-nowrap leading-5 font-medium transition-colors ease-in-out duration-[0.15s] hover:bg-red-100 m-0 px-3 py-0 rounded-md [appearance:button]">
              <X className="h-4 w-4 mr-1" />
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-0">
      <Card className="w-full bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
        <CardHeader className="flex flex-col bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6 md:p-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Bookmark className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="ml-2 mr-0">
                <CardTitle className="text-2xl leading-none font-semibold -tracking-wide m-0 md:text-2xl text-xl md:leading-none leading-7">
                  My Bookings
                </CardTitle>
                <CardDescription className="text-sm leading-5 text-neutral-500 m-0">
                  Manage your booked shifts
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="pending" className="relative">
                Pending
                {pendingBookings.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center">
                    {pendingBookings.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="relative">
                Confirmed
                {confirmedBookings.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                    {confirmedBookings.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-0">
              {pendingBookings.length > 0 ? (
                <div className="space-y-0">
                  {pendingBookings.map((booking, index) =>
                    renderBookingCard(booking, index, pendingBookings),
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  No pending bookings
                </div>
              )}
            </TabsContent>

            <TabsContent value="confirmed" className="mt-0">
              {confirmedBookings.length > 0 ? (
                <div className="space-y-0">
                  {confirmedBookings.map((booking, index) =>
                    renderBookingCard(booking, index, confirmedBookings),
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  No confirmed bookings
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              {completedBookings.length > 0 ? (
                <div className="space-y-0">
                  {completedBookings.map((booking, index) =>
                    renderBookingCard(booking, index, completedBookings),
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  No completed bookings
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="mt-0">
              {cancelledBookings.length > 0 ? (
                <div className="space-y-0">
                  {cancelledBookings.map((booking, index) =>
                    renderBookingCard(booking, index, cancelledBookings),
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  No cancelled bookings
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
