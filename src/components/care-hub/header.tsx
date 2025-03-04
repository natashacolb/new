import { Bell, Search, User } from "lucide-react";

export function CareHubHeader() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-4 font-bold text-xl">Care Hub Portal</div>
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search shifts, workers, or facilities..."
            className="h-9 w-80 rounded-md border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:block text-sm font-medium text-slate-700">
          Welcome, Care Hub Admin
        </div>
        <button className="text-slate-500 hover:text-slate-700 transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            5
          </span>
        </button>
        <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
