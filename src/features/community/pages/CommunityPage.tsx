"use client"

import type React from "react"

import { useState } from "react"
import { Users, Award, Calendar, Filter, Search, Plus } from "lucide-react"
import Header from "../../dashboard/components/DashboardHeader"
import Sidebar from "../../dashboard/components/DashboardSidebar"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"

import { PostItem } from "../components/PostItem"
import { EventItem } from "../components/EventItem"
import { ChallengeItem } from "../components/ChallengeItem"
import { TopLeaderboard } from "../components/TopLeaderboard"
import { LeaderboardTable } from "../components/LeaderboardTable"
import { CreatePostForm } from "../components/CreatePostForm"
import { CreateEventForm } from "../components/CreateEventForm"
import { CreateChallengeForm } from "../components/CreateChallengeForm"
import { useGetPostsQuery, useGetEventsQuery, useGetChallengesQuery } from "@/shared/services/communityApi"
import type { CommunityPostFilters, CommunityEventFilters, CommunityChallengeFilters } from "@/shared/types/communityTypes"
import { useGetLeaderboardQuery } from "@/shared/services/recyclingApi"


export default function CommunityPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)
  const [isNewEventOpen, setIsNewEventOpen] = useState(false)
  const [isNewChallengeOpen, setIsNewChallengeOpen] = useState(false)


  const [postFilters, setPostFilters] = useState<CommunityPostFilters>({ sortBy: "recent" })
  const [eventFilters, setEventFilters] = useState<CommunityEventFilters>({ upcoming: true })
  const [challengeFilters, setChallengeFilters] = useState<CommunityChallengeFilters>({ active: true })
  const [searchTerm, setSearchTerm] = useState("")

  const { data: postsData, isLoading: isLoadingPosts } = useGetPostsQuery({
    page: 0,
    size: 10,
    ...postFilters,
    search: searchTerm || undefined,
  })

  const { data: eventsData, isLoading: isLoadingEvents } = useGetEventsQuery({
    page: 0,
    size: 10,
    ...eventFilters,
  })

  const { data: challengesData, isLoading: isLoadingChallenges } = useGetChallengesQuery({
    page: 0,
    size: 10,
    ...challengeFilters,
  })


  
  const { data: leaderboardData, isLoading:isLoadingLeaderboard } = useGetLeaderboardQuery()
  if(isLoadingLeaderboard){
    console.log("loading");  console.log("lea"+leaderboardData);
  }

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
   
  }

  const handleSortChange = (value: string) => {
    setPostFilters({
      ...postFilters,
      sortBy: value as "recent" | "popular" | "comments",
    })
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
                <Button variant="outline" onClick={() => setIsNewEventOpen(true)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  New Event
                </Button>
                <Button onClick={() => setIsNewPostOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </div>
            </div>

         
            <Tabs defaultValue="feed" className="space-y-4">
              <TabsList className="grid grid-cols-4 md:w-auto">
                <TabsTrigger value="feed">Community Feed</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-4">
          
                <div className="flex flex-col md:flex-row gap-4">
                  <form className="relative flex-1" onSubmit={handleSearch}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search posts..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </form>
                  <div className="flex gap-2">
                    <Select defaultValue={postFilters.sortBy || "recent"} onValueChange={handleSortChange}>
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
                  {isLoadingPosts ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p>Loading posts...</p>
                      </CardContent>
                    </Card>
                  ) : postsData?.content && postsData.content.length > 0 ? (
                    postsData.content.map((post) => <PostItem key={post.id} post={post} />)
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p>No posts found. Be the first to share something!</p>
                        <Button className="mt-4" onClick={() => setIsNewPostOpen(true)}>
                          Create Post
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

        
              <TabsContent value="leaderboard" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Top Recyclers This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {isLoadingLeaderboard ? (
                        <p className="text-center">Loading leaderboard...</p>
                      ) : leaderboardData && leaderboardData.entries.length > 0 ? (
                        <>
                          <TopLeaderboard users={leaderboardData.entries} />

                          <div className="mt-8">
                            <LeaderboardTable users={leaderboardData.entries.map(entry => ({
                              ...entry,
                              entries: [], 
                              generatedAt: new Date().toISOString(), 
                            }))} />
                          </div>

                          <div className="text-center mt-4">
                            <p className="text-gray-500 text-sm mb-2">Your current rank: 15th</p>
                            <Button variant="outline">View Full Leaderboard</Button>
                          </div>
                        </>
                      ) : (
                        <p className="text-center">No leaderboard data available</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Upcoming Events</h2>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                    <Button onClick={() => setIsNewEventOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoadingEvents ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p>Loading events...</p>
                      </CardContent>
                    </Card>
                  ) : eventsData?.content && eventsData.content.length > 0 ? (
                    eventsData.content.map((event) => <EventItem key={event.id} event={event} />)
                  ) : (
                    <Card className="col-span-full">
                      <CardContent className="p-6 text-center">
                        <p>No events found. Create one to get started!</p>
                        <Button className="mt-4" onClick={() => setIsNewEventOpen(true)}>
                          Create Event
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {eventsData?.content && eventsData.content.length > 0 && (
                  <div className="text-center mt-6">
                    <Button variant="outline">View All Events</Button>
                  </div>
                )}
              </TabsContent>

              {/* Challenges Tab */}
              <TabsContent value="challenges" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Active Challenges</h2>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button onClick={() => setIsNewChallengeOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Challenge
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isLoadingChallenges ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p>Loading challenges...</p>
                      </CardContent>
                    </Card>
                  ) : challengesData?.content && challengesData.content.length > 0 ? (
                    challengesData.content.map((challenge) => (
                      <ChallengeItem key={challenge.id} challenge={challenge} />
                    ))
                  ) : (
                    <Card className="col-span-full">
                      <CardContent className="p-6 text-center">
                        <p>No challenges found. Create one to get started!</p>
                        <Button className="mt-4" onClick={() => setIsNewChallengeOpen(true)}>
                          Create Challenge
                        </Button>
                      </CardContent>
                    </Card>
                  )}
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
                      <Button
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => setIsNewChallengeOpen(true)}
                      >
                        Propose Challenge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      
      <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <CreatePostForm onSuccess={() => setIsNewPostOpen(false)} onCancel={() => setIsNewPostOpen(false)} />
        </DialogContent>
      </Dialog>

     
      <Dialog open={isNewEventOpen} onOpenChange={setIsNewEventOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <CreateEventForm onSuccess={() => setIsNewEventOpen(false)} onCancel={() => setIsNewEventOpen(false)} />
        </DialogContent>
      </Dialog>

      
      <Dialog open={isNewChallengeOpen} onOpenChange={setIsNewChallengeOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Challenge</DialogTitle>
          </DialogHeader>
          <CreateChallengeForm
            onSuccess={() => setIsNewChallengeOpen(false)}
            onCancel={() => setIsNewChallengeOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

