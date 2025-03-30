import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { cn } from "../utils/cn"

type AlertType = "success" | "warning" | "error" | "info"

interface EcoAlertProps {
  type: AlertType
  title: string
  description?: string
  className?: string
}

export function EcoAlert({ type, title, description, className }: EcoAlertProps) {
  const icons = {
    success: <CheckCircle className="h-4 w-4" />,
    warning: <AlertCircle className="h-4 w-4" />,
    error: <XCircle className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
  }

  const variant = type === "error" ? "destructive" : type

  return (
    <Alert variant={variant as any} className={cn(className)}>
      {icons[type]}
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}

