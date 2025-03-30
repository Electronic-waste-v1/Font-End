"use client"

import type React from "react"

import { useState } from "react"
import { Megaphone, Check } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { EcoAlert } from "@/shared/components/eco-alert"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()


    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

   
    setIsSubmitted(true)
    setError(null)
  }

  return (
    <section className="py-16 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-6">
            <Megaphone className="h-6 w-6 text-emerald-600" />
          </div>

          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter to receive the latest news, event announcements, and recycling tips directly in
            your inbox.
          </p>

          {isSubmitted ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4 mx-auto w-16 h-16">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thank You for Subscribing!</h3>
              <p className="text-gray-600">
                You've been added to our newsletter. Watch your inbox for updates on our latest recycling initiatives
                and events.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button type="submit" className="h-12 px-6">
                Subscribe
              </Button>
            </form>
          )}

          {error && (
            <div className="mt-4">
              <EcoAlert type="error" title={error} />
            </div>
          )}

          <p className="text-sm text-gray-500 mt-4">We respect your privacy. You can unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}

