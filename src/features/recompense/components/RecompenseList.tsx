"use client"

import { useState } from "react"
import { useGetRecompensesQuery, useDeleteRecompenseMutation, useAssignRecompenseMutation } from "@/shared/services/recompenseApi"
import type { Recompense } from "@/shared/types/recompenseTypes"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { Badge } from "@/shared/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { useToast } from "@/shared/components/ui/use-toast"
import { Edit, Trash2, MoreVertical, Gift } from "lucide-react"
import RecompenseForm from "./RecompenseForm"

interface RecompenseListProps {
  onEdit?: (recompense: Recompense) => void
}

export default function RecompenseList({ onEdit }: RecompenseListProps) {
  const { data: recompenses, isLoading, refetch } = useGetRecompensesQuery()
  const [deleteRecompense, { isLoading: isDeleting }] = useDeleteRecompenseMutation()
  const [assignRecompense, { isLoading: isAssigning }] = useAssignRecompenseMutation()
  const { toast } = useToast()

  const [selectedRecompense, setSelectedRecompense] = useState<Recompense | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this reward?")) {
      try {
        await deleteRecompense(id).unwrap()
        toast({
          title: "Reward deleted",
          description: "The reward has been deleted successfully.",
        })
        refetch()
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error deleting the reward.",
          variant: "destructive",
        })
        console.error("Error deleting reward:", error)
      }
    }
  }

  const handleAssign = async (recompenseId: number) => {

    const userId = 1 

    try {
      const result = await assignRecompense({ userId, recompenseId }).unwrap()
      toast({
        title: "Reward assigned",
        description: result.message || "The reward has been assigned successfully.",
      })
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error assigning the reward.",
        variant: "destructive",
      })
      console.error("Error assigning reward:", error)
    }
  }

  const handleEdit = (recompense: Recompense) => {
    setSelectedRecompense(recompense)
    setIsEditDialogOpen(true)
    if (onEdit) {
      onEdit(recompense)
    }
  }

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false)
    refetch()
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading rewards...</div>
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Rewards Management</CardTitle>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[600px] bg-white">
              <DialogHeader>
                <DialogTitle>{selectedRecompense?.id ? "Edit Reward" : "Create New Reward"}</DialogTitle>
              </DialogHeader>
              <RecompenseForm recompense={selectedRecompense || undefined} onSuccess={handleEditSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {recompenses && recompenses.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Merchant</TableHead>
                  <TableHead className="hidden md:table-cell">Expiry</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recompenses.map((recompense) => (
                  <TableRow key={recompense.id}>
                    <TableCell className="font-medium">{recompense.description}</TableCell>
                    <TableCell>{recompense.pointsRequis}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {recompense.category && <Badge variant="outline">{recompense.category}</Badge>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{recompense.merchant}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {recompense.expiryDays ? `${recompense.expiryDays} days` : "No expiry"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(recompense)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAssign(recompense.id!)}>
                            <Gift className="h-4 w-4 mr-2" />
                            Assign to User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(recompense.id!)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No rewards found. Create your first reward to get started.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

