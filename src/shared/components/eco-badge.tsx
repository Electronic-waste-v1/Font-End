import type React from "react"
import { Badge } from "./ui/badge"
import { cn } from "../utils/cn"

type EcoBadgeType = "success" | "warning" | "error" | "info" | "default"

interface EcoBadgeProps {
  type?: EcoBadgeType
  children: React.ReactNode
  className?: string
}

export function EcoBadge({ type = "default", children, className }: EcoBadgeProps) {
  return (
    <Badge
      variant={
        type === "success"
          ? "success"
          : type === "warning"
            ? "warning"
            : type === "error"
              ? "destructive"
              : type === "info"
                ? "info"
                : "default"
      }
      className={cn(className)}
    >
      {children}
    </Badge>
  )
}

