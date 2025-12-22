"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Label } from "@/app/components/ui/label"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { Navbar } from "@/app/components/navbar"

export default function ContactFormExamplePage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    contactMethod: "",
    message: "",
    newsletter: false,
    terms: false,
  })

  const [errors, setErrors] = React.useState<Record<string, string[]>>({})
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<"success" | "error" | null>(null)

  const validateField = (name: string, value: string | boolean) => {
    const fieldErrors: string[] = []

    switch (name) {
      case "name":
        if (!value || (typeof value === "string" && value.trim().length < 2)) {
          fieldErrors.push("Name must be at least 2 characters")
        }
        break
      case "email":
        if (!value || typeof value !== "string") {
          fieldErrors.push("Email is required")
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          fieldErrors.push("Please enter a valid email address")
        }
        break
      case "phone":
        if (value && typeof value === "string" && !/^[\d\s\-\+\(\)]+$/.test(value)) {
          fieldErrors.push("Please enter a valid phone number")
        }
        break
      case "inquiryType":
        if (!value || typeof value !== "string") {
          fieldErrors.push("Please select an inquiry type")
        }
        break
      case "contactMethod":
        if (!value || typeof value !== "string") {
          fieldErrors.push("Please select a preferred contact method")
        }
        break
      case "message":
        if (!value || (typeof value === "string" && value.trim().length < 10)) {
          fieldErrors.push("Message must be at least 10 characters")
        }
        break
      case "terms":
        if (!value) {
          fieldErrors.push("You must agree to the terms and conditions")
        }
        break
    }

    return fieldErrors
  }

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const fieldErrors = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors,
      }))
    }
  }

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const fieldErrors = validateField(name, formData[name as keyof typeof formData])
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {} as Record<string, boolean>)
    setTouched(allTouched)

    // Validate all fields
    const allErrors: Record<string, string[]> = {}
    Object.keys(formData).forEach((key) => {
      const fieldErrors = validateField(key, formData[key as keyof typeof formData])
      if (fieldErrors.length > 0) {
        allErrors[key] = fieldErrors
      }
    })

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitStatus("success")
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        contactMethod: "",
        message: "",
        newsletter: false,
        terms: false,
      })
      setTouched({})
      setErrors({})
      setSubmitStatus(null)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Dithering overlay */}
      <div className="fixed inset-0 dither-pattern pointer-events-none z-0 opacity-50" />
      
      <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-5xl font-bold md:text-6xl">Contact Us</h1>
              <p className="text-xl text-muted-foreground">
                Get in touch with us. We&apos;d love to hear from you!
              </p>
            </div>

            {/* Success Alert */}
            {submitStatus === "success" && (
              <Alert className="mb-6 border-4 border-green-500 bg-green-50 dark:bg-green-950">
                <AlertTitle className="text-green-900 dark:text-green-100 font-bold">
                  ✓ Message Sent!
                </AlertTitle>
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Thank you for contacting us. We&apos;ll get back to you soon.
                </AlertDescription>
              </Alert>
            )}

            {/* Error Alert */}
            {submitStatus === "error" && (
              <Alert className="mb-6 border-4 border-red-500 bg-red-50 dark:bg-red-950">
                <AlertTitle className="text-red-900 dark:text-red-100 font-bold">
                  ⚠ Please fix the errors below
                </AlertTitle>
                <AlertDescription className="text-red-800 dark:text-red-200">
                  Some fields need your attention before submitting.
                </AlertDescription>
              </Alert>
            )}

            {/* Contact Form */}
            <Card className="border-4">
              <CardHeader>
                <CardTitle className="text-3xl">Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form onSubmit={handleSubmit} errors={errors} touched={touched}>
                  <div className="space-y-6">
                    {/* Name Field */}
                    <FormField
                      name="name"
                      value={formData.name}
                      onChange={(value) => handleChange("name", value as string)}
                      onBlur={() => handleBlur("name")}
                    >
                      {({ field, error }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <Input
                            type="text"
                            placeholder="John Doe"
                            {...field}
                          />
                          <FormMessage>{error}</FormMessage>
                        </FormItem>
                      )}
                    </FormField>

                    {/* Email Field */}
                    <FormField
                      name="email"
                      value={formData.email}
                      onChange={(value) => handleChange("email", value as string)}
                      onBlur={() => handleBlur("email")}
                    >
                      {({ field, error }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                          />
                          <FormMessage>{error}</FormMessage>
                        </FormItem>
                      )}
                    </FormField>

                    {/* Phone Field */}
                    <FormField
                      name="phone"
                      value={formData.phone}
                      onChange={(value) => handleChange("phone", value as string)}
                      onBlur={() => handleBlur("phone")}
                    >
                      {({ field, error }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <Input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            {...field}
                          />
                          <FormMessage>{error}</FormMessage>
                        </FormItem>
                      )}
                    </FormField>

                    {/* Inquiry Type */}
                    <div className="space-y-2">
                      <Label>Inquiry Type *</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => {
                          handleChange("inquiryType", value)
                          handleBlur("inquiryType")
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="sales">Sales Question</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {touched.inquiryType && errors.inquiryType?.[0] && (
                        <p className="text-sm font-bold text-destructive">
                          {errors.inquiryType[0]}
                        </p>
                      )}
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="space-y-2">
                      <Label>Preferred Contact Method *</Label>
                      <RadioGroup
                        value={formData.contactMethod}
                        onValueChange={(value) => {
                          handleChange("contactMethod", value)
                          handleBlur("contactMethod")
                        }}
                      >
                        <div className="flex flex-col space-y-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email" className="font-normal cursor-pointer">
                              Email
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone" className="font-normal cursor-pointer">
                              Phone
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="either" id="either" />
                            <Label htmlFor="either" className="font-normal cursor-pointer">
                              Either is fine
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                      {touched.contactMethod && errors.contactMethod?.[0] && (
                        <p className="text-sm font-bold text-destructive">
                          {errors.contactMethod[0]}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <FormField
                      name="message"
                      value={formData.message}
                      onChange={(value) => handleChange("message", value as string)}
                      onBlur={() => handleBlur("message")}
                    >
                      {({ field, error }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <Textarea
                            placeholder="Tell us what's on your mind..."
                            rows={6}
                            {...field}
                          />
                          <FormMessage>{error}</FormMessage>
                        </FormItem>
                      )}
                    </FormField>

                    {/* Newsletter Checkbox */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onChange={(e) => handleChange("newsletter", e.target.checked)}
                      />
                      <Label htmlFor="newsletter" className="font-normal cursor-pointer">
                        Subscribe to our newsletter for updates and news
                      </Label>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.terms}
                          onChange={(e) => {
                            handleChange("terms", e.target.checked)
                            handleBlur("terms")
                          }}
                          className="mt-1"
                        />
                        <Label htmlFor="terms" className="font-normal cursor-pointer">
                          I agree to the{" "}
                          <Link href="#" className="text-primary hover:underline font-bold">
                            terms and conditions
                          </Link>{" "}
                          *
                        </Label>
                      </div>
                      {touched.terms && errors.terms?.[0] && (
                        <p className="text-sm font-bold text-destructive">
                          {errors.terms[0]}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="flex-1"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            inquiryType: "",
                            contactMethod: "",
                            message: "",
                            newsletter: false,
                            terms: false,
                          })
                          setTouched({})
                          setErrors({})
                          setSubmitStatus(null)
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </Form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card className="border-4">
                <CardHeader>
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Send us an email at{" "}
                    <a href="mailto:hello@example.com" className="text-primary hover:underline font-bold">
                      hello@example.com
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card className="border-4">
                <CardHeader>
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Call us at{" "}
                    <a href="tel:+15551234567" className="text-primary hover:underline font-bold">
                      +1 (555) 123-4567
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Back Link */}
            <div className="mt-8 text-center">
              <Link href="/docs/examples">
                <Button variant="outline" size="lg">
                  ← Back to Examples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

