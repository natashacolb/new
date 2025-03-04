import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AnalyticCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

export function AnalyticCard({
  title,
  value,
  subtext,
  icon: Icon,
  iconColor = "text-blue-500",
  iconBgColor = "bg-blue-50",
}: AnalyticCardProps) {
  return (
    <Card className="bg-white text-neutral-950 shadow-[transparent_0_0_0_0,transparent_0_0_0_0,rgba(0,0,0,0.05)_0_1px_2px_0] transition-all ease-in-out duration-[0.3s] rounded-lg border-2 [animation-duration:.3s]">
      <CardHeader className="flex flex-row items-center justify-between pt-6 pb-2 px-6">
        <CardTitle className="text-sm leading-5 font-medium -tracking-wide m-0">
          {title}
        </CardTitle>
        <div
          className={`${iconBgColor} ${iconColor} transition-transform ease-in-out duration-[0.3s] my-0 p-2 rounded-lg [animation-duration:.3s]`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-6 px-6">
        <div className="bg-[linear-gradient(to_right,#2563eb,#60a5fa)] bg-clip-text text-2xl leading-8 font-bold text-transparent">
          {value}
        </div>
        <p className="text-xs leading-4 text-neutral-500 m-0">{subtext}</p>
      </CardContent>
    </Card>
  );
}
