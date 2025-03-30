"use client"

import { useState } from "react"
import { Users, Award, Calendar, MessageSquare, ThumbsUp, Share2, Filter, Search, Plus, CalendarDays } from "lucide-react"
import Header from "../components/DashboardHeader"
import Sidebar from "../components/DashboardSidebar"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Badge } from "@/shared/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog"
import { Textarea } from "@/shared/components/ui/textarea"
import { Label } from "@/shared/components/ui/label"
import { Progress } from "@/shared/components/ui/progress"

const communityPosts = [
  {
    id: "post1",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      badge: "Gold Member",
    },
    date: "2 hours ago",
    content:
      "Just recycled my old laptop and smartphone today! Earned 200 points and feeling great about reducing e-waste. Has anyone recycled a laptop before? Any tips for data wiping?",
    likes: 24,
    comments: 8,
    tags: ["Recycling Tips", "Electronics"],
  },
  {
    id: "post2",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
      badge: "Silver Member",
    },
    date: "Yesterday",
    content:
      "Organized an e-waste collection drive at my office and collected over 50 devices! If anyone wants to organize something similar, I'm happy to share my experience and tips.",
    likes: 42,
    comments: 15,
    tags: ["Collection Drive", "Office Recycling"],
    image: "/placeholder.svg?height=300&width=600&text=Office+Collection+Drive",
  },
  {
    id: "post3",
    author: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=ER",
      badge: "Platinum Member",
    },
    date: "3 days ago",
    content:
      "Did you know that recycling one million laptops saves the energy equivalent to the electricity used by 3,657 U.S. homes in a year? Let's keep recycling our electronics!",
    likes: 56,
    comments: 7,
    tags: ["Fun Facts", "Environmental Impact"],
  },
  {
    id: "post4",
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=DW",
      badge: "Bronze Member",
    },
    date: "1 week ago",
    content:
      "I'm new to e-waste recycling. What are the most important things I should know? Any beginner tips would be appreciated!",
    likes: 18,
    comments: 23,
    tags: ["Beginner", "Questions"],
  },
]


const leaderboardUsers = [
  {
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40&text=ER",
    points: 4850,
    recycled: "78 items",
    badge: "Platinum",
    rank: 1,
  },
  {
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    points: 3720,
    recycled: "65 items",
    badge: "Gold",
    rank: 2,
  },
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    points: 2950,
    recycled: "52 items",
    badge: "Gold",
    rank: 3,
  },
  {
    name: "Alex Thompson",
    avatar: "/placeholder.svg?height=40&width=40&text=AT",
    points: 2340,
    recycled: "41 items",
    badge: "Silver",
    rank: 4,
  },
  {
    name: "Jessica Lee",
    avatar: "/placeholder.svg?height=40&width=40&text=JL",
    points: 1980,
    recycled: "37 items",
    badge: "Silver",
    rank: 5,
  },
  {
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
    points: 1450,
    recycled: "28 items",
    badge: "Bronze",
    rank: 6,
  },
  {
    name: "Lisa Martinez",
    avatar: "/placeholder.svg?height=40&width=40&text=LM",
    points: 1320,
    recycled: "25 items",
    badge: "Bronze",
    rank: 7,
  },
]


const communityEvents = [
  {
    id: "event1",
    title: "Community Cleanup Day",
    date: "April 22, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "Central Park",
    description:
      "Join us for a day of cleaning up e-waste and other recyclables from our local park. Bring your friends and family!",
    attendees: 45,
    image: "/placeholder.svg?height=200&width=400&text=Cleanup+Day",
  },
  {
    id: "event2",
    title: "E-Waste Recycling Workshop",
    date: "May 5, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center",
    description:
      "Learn about proper e-waste recycling techniques and how to prepare your devices for optimal recycling.",
    attendees: 32,
    image: "/placeholder.svg?height=200&width=400&text=Workshop",
  },
  {
    id: "event3",
    title: "Electronics Repair Cafe",
    date: "May 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Downtown Library",
    description: "Bring your broken electronics and learn how to repair them with the help of our volunteer experts.",
    attendees: 28,
    image: "/placeholder.svg?height=200&width=400&text=Repair+Cafe",
  },
]


const communityChallenges = [
  {
    id: "challenge1",
    title: "Spring Cleaning Challenge",
    description: "Recycle at least 5 electronic devices during April and earn bonus points and a special badge.",
    deadline: "April 30, 2025",
    participants: 156,
    progress: 60,
    reward: "500 bonus points + Spring Cleaner Badge",
    image: "/placeholder.svg?height=100&width=200&text=Spring+Challenge",
  },
  {
    id: "challenge2",
    title: "Battery Collection Drive",
    description: "Help us collect and properly recycle 1,000 batteries as a community. Every battery counts!",
    deadline: "May 15, 2025",
    participants: 89,
    progress: 45,
    reward: "Community achievement + 200 points per participant",
    image: "/placeholder.svg?height=100&width=200&text=Battery+Drive",
  },
  {
    id: "challenge3",
    title: "Refer-a-Friend Month",
    description:
      "Refer friends to join our recycling program. The person with the most successful referrals wins a prize!",
    deadline: "May 31, 2025",
    participants: 72,
    progress: 30,
    reward: "Eco-friendly prize pack + 100 points per referral",
    image: "/placeholder.svg?height=100&width=200&text=Referral+Challenge",
  },
]

export default function CommunityPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)
  const [newPostContent, setNewPostContent] = useState("")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleNewPost = () => {
    
    console.log("New post:", newPostContent)
    setNewPostContent("")
    setIsNewPostOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                  <Users className="mr-2 h-6 w-6 text-emerald-500" />
                  Community
                </h1>
                <p className="text-gray-500 mt-1">
                  Connect with other recyclers, share tips, and participate in events
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Events
                </Button>
                <Button onClick={() => setIsNewPostOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="feed" className="space-y-4">
              <TabsList className="grid grid-cols-4 md:w-auto">
                <TabsTrigger value="feed">Community Feed</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
              </TabsList>

              {/* Community Feed Tab */}
              <TabsContent value="feed" className="space-y-4">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search posts..." className="pl-10" />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="recent">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="comments">Most Comments</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Posts */}
                <div className="space-y-4">
                  {communityPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>
                              {post.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 text-xs">
                                {post.author.badge}
                              </Badge>
                              <span className="text-gray-500 text-sm">{post.date}</span>
                            </div>
                            <p className="mt-2 text-gray-700">{post.content}</p>

                            {post.image && (
                              <div className="mt-3 rounded-lg overflow-hidden">
                                <img
                                  src={post.image || "/placeholder.svg"}
                                  alt="Post attachment"
                                  className="w-full h-auto max-h-80 object-cover"
                                />
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-3">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="bg-gray-50">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center gap-4 mt-4 pt-3 border-t">
                              <Button variant="ghost" size="sm" className="text-gray-600">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {post.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                {post.comments}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600">
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Leaderboard Tab */}
              <TabsContent value="leaderboard" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Top Recyclers This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Top 3 Users */}
                      <div className="flex flex-col md:flex-row gap-4 justify-center items-end">
                        {/* 2nd Place */}
                        <div className="flex flex-col items-center order-2 md:order-1">
                          <Avatar className="h-16 w-16 border-2 border-gray-300">
                            <AvatarImage src={leaderboardUsers[1].avatar} alt={leaderboardUsers[1].name} />
                            <AvatarFallback>
                              {leaderboardUsers[1].name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="mt-2 text-center">
                            <div className="font-medium">{leaderboardUsers[1].name}</div>
                            <Badge className="bg-amber-100 text-amber-800 mt-1">
                              {leaderboardUsers[1].points} points
                            </Badge>
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-auto mt-2">
                              <span className="font-bold">2</span>
                            </div>
                          </div>
                        </div>

                        {/* 1st Place */}
                        <div className="flex flex-col items-center order-1 md:order-2">
                          <div className="w-10 h-10 flex items-center justify-center mb-2">
                            <Award className="h-10 w-10 text-amber-400" fill="currentColor" />
                          </div>
                          <Avatar className="h-20 w-20 border-4 border-amber-400">
                            <AvatarImage src={leaderboardUsers[0].avatar} alt={leaderboardUsers[0].name} />
                            <AvatarFallback>
                              {leaderboardUsers[0].name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="mt-2 text-center">
                            <div className="font-bold text-lg">{leaderboardUsers[0].name}</div>
                            <Badge className="bg-emerald-100 text-emerald-800 mt-1">
                              {leaderboardUsers[0].points} points
                            </Badge>
                            <div className="w-10 h-10 rounded-full bg-amber-400 text-white flex items-center justify-center mx-auto mt-2">
                              <span className="font-bold">1</span>
                            </div>
                          </div>
                        </div>

                        {/* 3rd Place */}
                        <div className="flex flex-col items-center order-3">
                          <Avatar className="h-16 w-16 border-2 border-amber-700">
                            <AvatarImage src={leaderboardUsers[2].avatar} alt={leaderboardUsers[2].name} />
                            <AvatarFallback>
                              {leaderboardUsers[2].name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="mt-2 text-center">
                            <div className="font-medium">{leaderboardUsers[2].name}</div>
                            <Badge className="bg-amber-100 text-amber-800 mt-1">
                              {leaderboardUsers[2].points} points
                            </Badge>
                            <div className="w-8 h-8 rounded-full bg-amber-700 text-white flex items-center justify-center mx-auto mt-2">
                              <span className="font-bold">3</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Leaderboard Table */}
                      <div className="mt-8">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-4 py-2 text-left">Rank</th>
                                <th className="px-4 py-2 text-left">User</th>
                                <th className="px-4 py-2 text-left">Points</th>
                                <th className="px-4 py-2 text-left">Items Recycled</th>
                                <th className="px-4 py-2 text-left">Badge</th>
                              </tr>
                            </thead>
                            <tbody>
                              {leaderboardUsers.map((user) => (
                                <tr key={user.name} className="border-b">
                                  <td className="px-4 py-3">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                      <span className={`font-medium ${user.rank <= 3 ? "text-amber-600" : ""}`}>
                                        {user.rank}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center">
                                      <Avatar className="h-8 w-8 mr-2">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>
                                          {user.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium">{user.name}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 font-medium text-emerald-600">{user.points}</td>
                                  <td className="px-4 py-3">{user.recycled}</td>
                                  <td className="px-4 py-3">
                                    <Badge
                                      className={`
                                        ${user.badge === "Platinum" ? "bg-slate-200 text-slate-800" : ""}
                                        ${user.badge === "Gold" ? "bg-amber-100 text-amber-800" : ""}
                                        ${user.badge === "Silver" ? "bg-gray-200 text-gray-800" : ""}
                                        ${user.badge === "Bronze" ? "bg-amber-700 text-white" : ""}
                                      `}
                                    >
                                      {user.badge}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="text-center mt-4">
                        <p className="text-gray-500 text-sm mb-2">Your current rank: 15th</p>
                        <Button variant="outline">View Full Leaderboard</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Upcoming Events</h2>
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {communityEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {event.date} • {event.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{event.attendees} attending</span>
                          <Button size="sm">RSVP</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Button variant="outline">View All Events</Button>
                </div>
              </TabsContent>

              {/* Challenges Tab */}
              <TabsContent value="challenges" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Active Challenges</h2>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {communityChallenges.map((challenge) => (
                   <Card key={challenge.id} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                   <CardContent className="p-5">
                     <div className="flex flex-col gap-4">
                       {/* Challenge header with image and title */}
                       <div className="flex gap-4 items-start">
                         <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                           <img
                             src={challenge.image || "/placeholder.svg"}
                             alt={challenge.title}
                             className="w-full h-full object-cover"
                           />
                         </div>
                         <div className="flex-1">
                           <h3 className="font-semibold text-lg text-gray-900">{challenge.title}</h3>
                           <p className="text-sm text-gray-500 mt-1">
                             <CalendarDays className="inline h-4 w-4 mr-1" />
                             Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                           </p>
                         </div>
                       </div>
                 
                       {/* Challenge description */}
                       <p className="text-sm text-gray-600">{challenge.description}</p>
                 
                       {/* Community progress section */}
                       <div className="space-y-2">
                         <div className="flex justify-between text-sm">
                           <span className="text-gray-500">Community Progress</span>
                           <span className="font-medium text-gray-700">{challenge.progress}%</span>
                         </div>
                         <Progress value={challenge.progress} className="h-2 bg-gray-100" />
                         <div className="flex justify-between text-xs text-gray-500">
                           <span className="flex items-center">
                             <Users className="h-3 w-3 mr-1" />
                             {challenge.participants} participants
                           </span>
                           <span className="flex items-center">
                             <Award className="h-3 w-3 mr-1" />
                             Reward: {challenge.reward}
                           </span>
                         </div>
                       </div>
                 
                       {/* User progress and action */}
                       <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                         <div className="text-sm text-gray-700">
                           <span className="font-medium">Your progress:</span> 2/5 items
                           <Progress value={40} className="h-1 mt-1 bg-gray-100" />
                         </div>
                         <Button size="sm" variant="outline" className="border-primary">
                            Join Challenge
                         </Button>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
                  ))}
                </div>

                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Award className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="font-bold text-lg text-emerald-800">Create Your Own Challenge</h3>
                        <p className="text-emerald-700">
                          Have an idea for a community challenge? Submit your proposal and inspire others to join your
                          cause!
                        </p>
                      </div>
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Propose Challenge</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* New Post Dialog */}
      <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="post-content">What's on your mind?</Label>
              <Textarea
                id="post-content"
                placeholder="Share your recycling tips, questions, or achievements..."
                className="min-h-[120px]"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Add Tags (Optional)</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                  Recycling Tips
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                  Question
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                  Achievement
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                  Event
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                  + Add Tag
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Add Photo (Optional)</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                <Button variant="outline" size="sm">
                  Upload Image
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewPostOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleNewPost} disabled={!newPostContent.trim()}>
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

