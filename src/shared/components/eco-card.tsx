import type React from "react"
import { Recycle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { cn } from "../utils/cn"

interface EcoCardProps {
  title: string
  icon?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  children: React.ReactNode
  variant?: "default" | "outline" | "highlight"
}

export function EcoCard({
  title,
  icon = <Recycle className="h-5 w-5 text-emerald-500" />,
  footer,
  className,
  children,
  variant = "default",
}: EcoCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200",
        variant === "outline" && "border-emerald-200",
        variant === "highlight" && "border-emerald-500 shadow-md",
        className,
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter className="pt-0">{footer}</CardFooter>}
    </Card>
  )
}

