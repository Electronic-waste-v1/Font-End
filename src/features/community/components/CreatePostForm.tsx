"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/shared/components/ui/label"
import { Input } from "@/shared/components/ui/input" 
import { Textarea } from "@/shared/components/ui/textarea"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { useCreatePostMutation } from "@/shared/services/communityApi"
import type { CommunityPostRequest } from "@/shared/types/communityTypes"

interface CreatePostFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSuccess, onCancel }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [image, setImage] = useState<string | undefined>(undefined)
  const [createPost, { isLoading }] = useCreatePostMutation()

  const availableTags = [
    "Recycling Tips",
    "Question",
    "Achievement",
    "Event",
    "Electronics",
    "Fun Facts",
    "Environmental Impact",
    "Collection Drive",
  ]

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return 

    const postData: CommunityPostRequest = {
      title, 
      content,
      tags: selectedTags,
      image,
    }

    try {
      await createPost(postData).unwrap()
      setTitle("") 
      setContent("")
      setSelectedTags([])
      setImage(undefined)
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Failed to create post:", error)
    }
  }

  const handleImageUpload = () => {
   
    setImage("/placeholder.svg?height=300&width=600&text=Uploaded+Image")
  }

  return (
    <div className="space-y-4">
      {/* Title Input Field */}
      <div className="space-y-2">
        <Label htmlFor="post-title">Title</Label>
        <Input
          id="post-title"
          placeholder="Enter a title for your post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Content Textarea */}
      <div className="space-y-2">
        <Label htmlFor="post-content">What's on your mind?</Label>
        <Textarea
          id="post-content"
          placeholder="Share your recycling tips, questions, or achievements..."
          className="min-h-[120px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Tags Section */}
      <div className="space-y-2">
        <Label>Add Tags (Optional)</Label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer ${selectedTags.includes(tag) ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : "hover:bg-gray-100"}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-2">
        <Label>Add Photo (Optional)</Label>
        {image ? (
          <div className="relative">
            <img src={image || "/placeholder.svg"} alt="Upload preview" className="w-full h-auto rounded-lg" />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setImage(undefined)}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
            <Button variant="outline" size="sm" onClick={handleImageUpload}>
              Upload Image
            </Button>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSubmit} disabled={isLoading || !title.trim() || !content.trim()}>
          {isLoading ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  )
}