"use client"

import { useState } from "react"
import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent } from "@/shared/components/ui/card"
import { ThumbsUp, MessageSquare, Share2, Send } from "lucide-react"
import { Textarea } from "@/shared/components/ui/textarea"
import type { CommunityPost, Comment } from "@/shared/types/communityTypes"
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
} from "@/shared/services/communityApi"

interface PostItemProps {
  post: CommunityPost
  onCommentClick?: (postId: string) => void
}

export const PostItem: React.FC<PostItemProps> = ({ post, onCommentClick }) => {
  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")

  const { data: commentsData, isLoading: isLoadingComments } = useGetCommentsByPostIdQuery(
    { postId: post.id, page: 0, size: 10 },
    { skip: !showComments },
  )

  const [createComment, { isLoading: isSubmittingComment }] = useCreateCommentMutation()

  const handleLikeToggle = async () => {
    try {
      if (post.isLikedByCurrentUser) {
        await unlikePost(post.id).unwrap()
      } else {
        await likePost(post.id).unwrap()
      }
    } catch (error) {
      console.error("Failed to toggle like:", error)
    }
  }

  const handleCommentClick = () => {
    setShowComments(!showComments)
    if (onCommentClick) {
      onCommentClick(post.id)
    }
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    try {
      await createComment({
        postId: post.id,
        content: newComment,
      }).unwrap()
      setNewComment("")
    } catch (error) {
      console.error("Failed to submit comment:", error)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.username.slice(0, 1).toUpperCase()}</AvatarFallback>
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
              <Button
                variant="ghost"
                size="sm"
                className={`${post.isLikedByCurrentUser ? "text-emerald-600" : "text-gray-600"}`}
                onClick={handleLikeToggle}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                {post.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`${showComments ? "text-emerald-600" : "text-gray-600"}`}
                onClick={handleCommentClick}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>

            {/* Comments Section */}
            {showComments && (
              <div className="mt-4 pt-3 border-t">
                <h4 className="text-sm font-medium mb-3">Comments</h4>

                {/* Comment Input */}
                <div className="flex gap-3 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Textarea
                      placeholder="Write a comment..."
                      className="min-h-[40px] text-sm resize-none"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                      size="icon"
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim() || isSubmittingComment}
                      className="h-10 w-10 shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-3">
                  {isLoadingComments ? (
                    <p className="text-sm text-gray-500">Loading comments...</p>
                  ) : commentsData?.content?.length ? (
                    commentsData.content.map((comment: Comment) => <CommentItem key={comment.id} comment={comment} />)
                  ) : (
                    <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CommentItemProps {
  comment: Comment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback>{comment.author.username?.slice(0, 1).toUpperCase() || "U"}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <span className="text-xs text-gray-500">{comment.date}</span>
          </div>
          <p className="text-sm text-gray-700">{comment.content}</p>
        </div>
        <div className="flex gap-4 mt-1 ml-1">
          <button className="text-xs text-gray-500 hover:text-gray-700">Like</button>
          <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
        </div>
      </div>
    </div>
  )
}

