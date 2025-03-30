import type React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { cn } from "../utils/cn"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  change?: {
    value: string | number
    type: "increase" | "decrease" | "neutral"
  }
  className?: string
}

export function StatCard({ title, value, icon, change, className }: StatCardProps) {
  return (
    <Card className={cn("border-none shadow-sm", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>

            {change && (
              <div className="flex items-center mt-1">
                {change.type === "increase" && <ArrowUp className="h-3 w-3 text-emerald-500 mr-1" />}
                {change.type === "decrease" && <ArrowDown className="h-3 w-3 text-red-500 mr-1" />}
                <span
                  className={cn(
                    "text-xs",
                    change.type === "increase" && "text-emerald-600",
                    change.type === "decrease" && "text-red-600",
                    change.type === "neutral" && "text-gray-500",
                  )}
                >
                  {change.value}
                </span>
              </div>
            )}
          </div>

          <div className="bg-emerald-50 p-3 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

