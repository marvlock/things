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
import { ArrowLeft, Mail, MessageCircle, Phone, Sparkles } from "lucide-react"

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
    <div className="min-h-screen bg-[#F7F4EE] relative">
      {/* Dithering overlay */}
      <div className="fixed inset-0 dither-pattern pointer-events-none z-0 opacity-50" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 md:py-14">
          <div className="mx-auto max-w-5xl">
            <Link href="/docs/examples" className="mb-8 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4"><ArrowLeft className="h-4 w-4" /> All examples</Link>
            {/* Header */}
            <div className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="border-4 border-foreground bg-[#FF8FAB] p-7 neobrutalism-shadow-lg sm:p-10">
                <div className="flex items-center justify-between"><span className="text-sm font-black uppercase tracking-[0.16em]">Say hello</span><MessageCircle className="h-7 w-7" /></div>
                <h1 className="mt-10 text-5xl font-black uppercase leading-[0.88] md:text-6xl">Let&apos;s make<br />something good.</h1>
                <p className="mt-6 max-w-md text-lg font-medium">Have a project, a question, or a bright idea? Send it over. We read every note.</p>
              </div>
              <div className="flex flex-col justify-between border-4 border-foreground bg-foreground p-7 text-background neobrutalism-shadow-lg sm:p-10">
                <Sparkles className="h-7 w-7 text-[#FFD166]" />
                <div><p className="text-sm font-black uppercase tracking-[0.16em] text-[#FFD166]">Response time</p><p className="mt-2 text-4xl font-black">Within 2 days</p><p className="mt-3 text-sm text-background/70">Usually sooner, Monday through Friday.</p></div>
              </div>
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
            <Card className="border-4 bg-background">
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
                          <FormLabel htmlFor="contact-name">Full Name *</FormLabel>
                          <Input
                            id="contact-name"
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
                          <FormLabel htmlFor="contact-email">Email Address *</FormLabel>
                          <Input
                            id="contact-email"
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
                          <FormLabel htmlFor="contact-phone">Phone Number</FormLabel>
                          <Input
                            id="contact-phone"
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
                      <Label id="inquiry-type-label">Inquiry Type *</Label>
                      <Select
                        value={formData.inquiryType}
                        aria-labelledby="inquiry-type-label"
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
                      <Label id="contact-method-label">Preferred Contact Method *</Label>
                      <RadioGroup
                        value={formData.contactMethod}
                        aria-labelledby="contact-method-label"
                        onValueChange={(value) => {
                          handleChange("contactMethod", value)
                          handleBlur("contactMethod")
                        }}
                      >
                        <div className="flex flex-col space-y-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="contact-method-email" />
                            <Label htmlFor="contact-method-email" className="font-normal cursor-pointer">
                              Email
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="contact-method-phone" />
                            <Label htmlFor="contact-method-phone" className="font-normal cursor-pointer">
                              Phone
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="either" id="contact-method-either" />
                            <Label htmlFor="contact-method-either" className="font-normal cursor-pointer">
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
                          <FormLabel htmlFor="contact-message">Message *</FormLabel>
                          <Textarea
                            id="contact-message"
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
              <Card className="border-4 bg-[#FFD166]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Email</CardTitle>
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

              <Card className="border-4 bg-[#75C2F6]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5" /> Phone</CardTitle>
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
