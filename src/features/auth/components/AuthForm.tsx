"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Label } from "../../../shared/components/ui/label"
import { Checkbox } from "../../../shared/components/ui/checkbox"
import { Alert, AlertDescription } from "../../../shared/components/ui/alert"

export interface FormFields {
  username?: string
  email: string
  password: string
  confirmPassword?: string
  remember?: boolean
}

interface AuthFormProps {
  type: "login" | "register"
  onSubmit: (data: FormFields) => void
  isLoading: boolean
  error: string | null
}

export function AuthForm({ type, onSubmit, isLoading, error }: AuthFormProps) {
  const [formData, setFormData] = useState<FormFields>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<Partial<FormFields>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    
    if (formErrors[name as keyof FormFields]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      })
    }
  }

  const validateForm = (): boolean => {
    const errors: Partial<FormFields> = {}

    if (type === "register" && !formData.username?.trim()) {
      errors.username = "Username is required"
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    if (!formData.password) {
      errors.password = "Password is required"
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if (type === "register" && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {

      const submitData = { ...formData }
      delete submitData.confirmPassword
      onSubmit(submitData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {type === "register" && (
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="johndoe"
            className={`${formErrors.username ? "border-red-500" : ""} text-black`}
          />
          {formErrors.username && <p className="text-sm text-red-500">{formErrors.username}</p>}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`${formErrors.email ? "border-red-500" : ""} text-black`}
        />
        {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          {type === "login" && (
            <a href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700">
              Forgot password?
            </a>
          )}
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`${formErrors.password ? "border-red-500" : ""} text-black`}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
          </button>
        </div>
        {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
      </div>

      {type === "register" && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`${formErrors.confirmPassword ? "border-red-500" : ""} text-black`}
            />
          </div>
          {formErrors.confirmPassword && <p className="text-sm text-red-500">{formErrors.confirmPassword}</p>}
        </div>
      )}

      {type === "login" && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            name="remember"
            checked={formData.remember}
            onCheckedChange={(checked) => setFormData({ ...formData, remember: checked as boolean })}
          />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember me for 30 days
          </Label>
        </div>
      )}

      <Button type="submit" className="w-full bg-gradient-to-r from-green-950 to-green-500 hover:bg-emerald-600" disabled={isLoading}>
        {isLoading
          ? type === "login"
            ? "Signing in..."
            : "Creating account..."
          : type === "login"
            ? "Sign in"
            : "Create account"}
      </Button>
    </form>
  )
}

