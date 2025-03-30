import { Link } from "react-router-dom"
import {
  LayoutDashboard,
  Recycle,
  MapPin,
  Gift,
  Megaphone,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  DollarSign,
  Trash2,
} from "lucide-react"
import { cn } from "../../../shared/utils/cn"
import EwateLogo from "@/shared/components/EwateLogo"
import { useGetCurrentUserQuery, useGetUserPointsQuery } from "@/features/auth/services/authApi"

interface SidebarProps {
  isOpen: boolean
}

export default function DashboardSidebar({ isOpen }: SidebarProps) {
  const { data: user, isLoading: isUserLoading } = useGetCurrentUserQuery()
  const { data: pointsData, isLoading: isPointsLoading } = useGetUserPointsQuery(user?.id || 0, {
    skip: !user?.id,
  })

  const isOrganizer = user?.role === "organisateur"

  const baseMenuItems = [

    { icon: Recycle, label: "My Recycling", href: "/dashboard/recycling", active: true },
    { icon: Gift, label: "Rewards", href: "/dashboard/rewards" },
    { icon: Megaphone, label: "Announcements", href: "/dashboard/announcements" },
    { icon: Users, label: "Community", href: "/dashboard/community" },
    { icon: Trash2, label: "E-waste", href: "/dashboard/Ewaste" },
  ]

  const organizerMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: DollarSign, label: "Recompense", href: "/dashboard/recompense" },
    { icon: MapPin, label: "Collection Points", href: "/dashboard/collection-points" },
  ]

  const menuItems = [ ...(isOrganizer ? organizerMenuItems : baseMenuItems)]

  const bottomMenuItems = [
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    { icon: HelpCircle, label: "Help & Support", href: "/dashboard/support" },
    { icon: LogOut, label: "Log Out", href: "/logout" },
  ]

  const availablePoints = pointsData?.pointsAvailable || 0
  const totalPoints = pointsData?.pointsTotal || 0
  const usedPoints = pointsData?.pointsUtilises || 0

  const nextRewardThreshold = 100
  const progressPercentage = Math.min((availablePoints / nextRewardThreshold) * 100, 100)
  const pointsToNextReward = Math.max(nextRewardThreshold - availablePoints, 0)

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 w-64 shrink-0 overflow-y-auto transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-0",
        "fixed inset-y-0 z-20 md:relative md:translate-x-0",
      )}
    >
      <div className="p-4 h-16 flex items-center border-b border-gray-200 md:hidden">
        <div className="flex items-center gap-2">
          <EwateLogo width={40} height={40} />
          <span className="font-bold text-lg text-emerald-600">E-waste</span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 font-medium">
                {isUserLoading ? "..." : user?.username?.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{isUserLoading ? "Loading..." : user?.username || "Guest"}</p>
              <p className="text-sm text-gray-500">{isUserLoading ? "loading@example.com" : user?.email}</p>
              {isOrganizer && (
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full mt-1 inline-block">
                  Organizer
                </span>
              )}
            </div>
          </div>

          <div className="bg-emerald-50 rounded-md p-3 mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Available Points</span>
              <span className="text-sm font-bold text-emerald-600">
                {isPointsLoading ? "..." : availablePoints.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Total: {totalPoints}</span>
              <span className="text-xs text-gray-500">Used: {usedPoints}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {pointsToNextReward > 0
                ? `${pointsToNextReward} points until next reward`
                : "You reached the next reward level!"}
            </p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                item.active ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <nav className="space-y-1">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

