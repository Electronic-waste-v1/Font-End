import { Lightbulb, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"


const recyclingTips = [
  {
    id: "tip1",
    title: "Prepare Your Electronics Before Recycling",
    content:
      "Before recycling your electronics, make sure to back up your data, perform a factory reset, and remove any batteries. This helps protect your personal information and ensures proper recycling.",
    link: "#",
  },
  {
    id: "tip2",
    title: "Separate Batteries from Devices",
    content:
      "Always remove batteries from devices before recycling. Different types of batteries require different recycling processes, and some may be hazardous if not handled properly.",
    link: "#",
  },
  {
    id: "tip3",
    title: "Don't Throw E-Waste in Regular Trash",
    content:
      "Electronic waste contains hazardous materials that can harm the environment if disposed of improperly. Always use designated e-waste recycling services or drop-off points.",
    link: "#",
  },
]

export default function RecyclingTips() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Recycling Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recyclingTips.map((tip) => (
            <div key={tip.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full mt-1">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium">{tip.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{tip.content}</p>
                  <Button variant="link" className="text-emerald-600 p-0 h-auto mt-1 text-sm">
                    Learn more <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Button variant="outline">View All Recycling Tips</Button>
        </div>
      </CardContent>
    </Card>
  )
}

