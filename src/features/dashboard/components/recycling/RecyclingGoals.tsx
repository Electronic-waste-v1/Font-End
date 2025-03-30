"use client"

import { useState } from "react"
import { Trophy, Target, Plus, Edit2, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../shared/components/ui/card"
import { Button } from "../../../../shared/components/ui/button"
import { Progress } from "../../../../shared/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../../shared/components/ui/dialog"
import { Input } from "../../../../shared/components/ui/input"
import { Label } from "../../../../shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/components/ui/select"
import { EcoBadge } from "../../../../shared/components/eco-badge"

const initialGoals = [
  {
    id: "g1",
    title: "Recycle 100kg of e-waste",
    description: "Recycle at least 100kg of electronic waste by the end of the year",
    progress: 42.5,
    target: 100,
    unit: "kg",
    deadline: "December 31, 2025",
    status: "in-progress",
  },
  {
    id: "g2",
    title: "Recycle 10 old devices",
    description: "Recycle at least 10 old electronic devices",
    progress: 6,
    target: 10,
    unit: "devices",
    deadline: "June 30, 2025",
    status: "in-progress",
  },
  {
    id: "g3",
    title: "Maintain weekly recycling",
    description: "Recycle e-waste at least once every week for 12 consecutive weeks",
    progress: 8,
    target: 12,
    unit: "weeks",
    deadline: "May 15, 2025",
    status: "in-progress",
  },
  {
    id: "g4",
    title: "Recycle old laptop",
    description: "Properly recycle my old laptop and accessories",
    progress: 100,
    target: 100,
    unit: "%",
    deadline: "January 15, 2025",
    status: "completed",
  },
]

export default function RecyclingGoals() {
  const [goals, setGoals] = useState(initialGoals)
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target: "",
    unit: "kg",
    deadline: "",
  })

  const handleAddGoal = () => {
    const goal = {
      id: `g${goals.length + 1}`,
      title: newGoal.title,
      description: newGoal.description,
      progress: 0,
      target: Number.parseFloat(newGoal.target),
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      status: "in-progress",
    }

    setGoals([...goals, goal])
    setIsAddGoalOpen(false)
    setNewGoal({
      title: "",
      description: "",
      target: "",
      unit: "kg",
      deadline: "",
    })
  }

  return (
    <>
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recycling Goals</CardTitle>
            <Button onClick={() => setIsAddGoalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{goal.title}</h3>
                      <EcoBadge type={goal.status === "completed" ? "success" : "info"} className="ml-2">
                        {goal.status === "completed" ? "Completed" : "In Progress"}
                      </EcoBadge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">
                      Progress: {goal.progress} {goal.unit}
                    </span>
                    <span className="font-medium">{Math.round((goal.progress / goal.target) * 100)}%</span>
                  </div>
                  <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
                </div>

                <div className="flex justify-between mt-3 pt-2 border-t border-gray-100 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Target className="h-3 w-3 mr-1" />
                    Target: {goal.target} {goal.unit}
                  </div>
                  <div className="flex items-center">
                    <Trophy className="h-3 w-3 mr-1" />
                    Deadline: {goal.deadline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Goal Dialog */}
      <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Recycling Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="e.g., Recycle 50kg of e-waste"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                placeholder="Describe your goal"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target">Target Amount</Label>
                <Input
                  id="target"
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  placeholder="e.g., 50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={newGoal.unit} onValueChange={(value) => setNewGoal({ ...newGoal, unit: value })}>
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="devices">Devices</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="%">Percentage (%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

