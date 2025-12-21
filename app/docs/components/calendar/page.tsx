"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Calendar } from "@/app/components/ui/calendar"
import { CodeBlock } from "@/app/components/code-block"

export default function CalendarDocsPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date(2025, 11, 21)
  )

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 pr-8 md:pr-12">
      <div className="mx-auto max-w-3xl pl-8 md:pl-12">
        <h1 className="mb-4 text-5xl font-bold">Calendar</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          A date field component that allows users to enter and edit date.
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            The Calendar component displays a date picker with month navigation, day selection,
            and visual indicators for the selected date. It shows dates from the current month
            along with dates from adjacent months. Built from scratch using React and native HTML elements.
            No UI library dependencies.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Code</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                <strong>TypeScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/calendar.tsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CalendarProps {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  className?: string
}

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function getDaysForMonth(year: number, month: number): (number | null)[] {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const days: (number | null)[] = []

  const prevMonthDays = getDaysInMonth(year, month - 1)
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(prevMonthDays - i)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push(i)
  }

  return days
}

export function Calendar({ value, defaultValue, onValueChange, className }: CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value ?? defaultValue
  )
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const date = value ?? defaultValue ?? new Date()
    return date.getMonth()
  })
  const [currentYear, setCurrentYear] = React.useState(() => {
    const date = value ?? defaultValue ?? new Date()
    return date.getFullYear()
  })

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value)
      setCurrentMonth(value.getMonth())
      setCurrentYear(value.getFullYear())
    }
  }, [value])

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return

    const newDate = new Date(currentYear, currentMonth, day)
    setSelectedDate(newDate)
    onValueChange?.(newDate)
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const days = getDaysForMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)

  return (
    <div
      className={cn(
        "rounded-lg border-2 border-foreground bg-primary text-primary-foreground p-4 neobrutalism-shadow",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="flex h-8 w-8 items-center justify-center rounded border-2 border-foreground bg-primary hover:bg-primary/90 transition-colors neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          aria-label="Previous month"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h3 className="font-bold text-lg">
          {MONTHS[currentMonth]} {currentYear}
        </h3>
        <button
          onClick={handleNextMonth}
          className="flex h-8 w-8 items-center justify-center rounded border-2 border-foreground bg-primary hover:bg-primary/90 transition-colors neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          aria-label="Next month"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center text-sm font-bold py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isPrevMonth = index < firstDay
          const isNextMonth = index >= firstDay + daysInMonth
          const isCurrentMonth = !isPrevMonth && !isNextMonth
          const isSelected =
            isCurrentMonth &&
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear

          return (
            <button
              key={index}
              onClick={() => day !== null && handleDateClick(day, isCurrentMonth)}
              disabled={!isCurrentMonth}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded border-2 border-foreground text-sm font-bold transition-colors neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
                isCurrentMonth
                  ? "bg-primary hover:bg-primary/90 cursor-pointer"
                  : "bg-primary/50 text-primary-foreground/50 cursor-not-allowed",
                isSelected && "bg-foreground text-background"
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2">
                <strong>JavaScript:</strong> Copy this code into <code className="bg-muted px-1 py-0.5 rounded">components/ui/calendar.jsx</code>:
              </p>
              <CodeBlock
                code={`"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

function getDaysForMonth(year, month) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const days = []

  const prevMonthDays = getDaysInMonth(year, month - 1)
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(prevMonthDays - i)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push(i)
  }

  return days
}

export function Calendar({ value, defaultValue, onValueChange, className }) {
  const [selectedDate, setSelectedDate] = React.useState(
    value ?? defaultValue
  )
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const date = value ?? defaultValue ?? new Date()
    return date.getMonth()
  })
  const [currentYear, setCurrentYear] = React.useState(() => {
    const date = value ?? defaultValue ?? new Date()
    return date.getFullYear()
  })

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value)
      setCurrentMonth(value.getMonth())
      setCurrentYear(value.getFullYear())
    }
  }, [value])

  const handleDateClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return

    const newDate = new Date(currentYear, currentMonth, day)
    setSelectedDate(newDate)
    onValueChange?.(newDate)
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const days = getDaysForMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)

  return (
    <div
      className={cn(
        "rounded-lg border-2 border-foreground bg-primary text-primary-foreground p-4 neobrutalism-shadow",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="flex h-8 w-8 items-center justify-center rounded border-2 border-foreground bg-primary hover:bg-primary/90 transition-colors neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          aria-label="Previous month"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h3 className="font-bold text-lg">
          {MONTHS[currentMonth]} {currentYear}
        </h3>
        <button
          onClick={handleNextMonth}
          className="flex h-8 w-8 items-center justify-center rounded border-2 border-foreground bg-primary hover:bg-primary/90 transition-colors neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          aria-label="Next month"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center text-sm font-bold py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isPrevMonth = index < firstDay
          const isNextMonth = index >= firstDay + daysInMonth
          const isCurrentMonth = !isPrevMonth && !isNextMonth
          const isSelected =
            isCurrentMonth &&
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear

          return (
            <button
              key={index}
              onClick={() => day !== null && handleDateClick(day, isCurrentMonth)}
              disabled={!isCurrentMonth}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded border-2 border-foreground text-sm font-bold transition-colors neobrutalism-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
                isCurrentMonth
                  ? "bg-primary hover:bg-primary/90 cursor-pointer"
                  : "bg-primary/50 text-primary-foreground/50 cursor-not-allowed",
                isSelected && "bg-foreground text-background"
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}`}
                language="jsx"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4">Usage</h2>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2"><strong>TypeScript:</strong></p>
              <CodeBlock
                code={`import { Calendar } from "@/components/ui/calendar"

function MyComponent() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      value={date}
      onValueChange={setDate}
    />
  )
}`}
                language="tsx"
              />
            </div>

            <div>
              <p className="mb-2"><strong>JavaScript:</strong></p>
              <CodeBlock
                code={`import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

function MyComponent() {
  const [date, setDate] = useState(undefined)

  return (
    <Calendar
      value={date}
      onValueChange={setDate}
    />
  )
}`}
                language="jsx"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Make sure you also have the <code className="bg-muted px-1 py-0.5 rounded">lib/utils.ts</code> file 
            with the <code className="bg-muted px-1 py-0.5 rounded">cn</code> helper function.
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Examples</h2>
          <div className="rounded-lg border-2 border-foreground p-6 neobrutalism-shadow space-y-4">
            <Calendar
              value={selectedDate}
              onValueChange={setSelectedDate}
            />
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t-2 border-foreground pt-8">
          <Link href="/docs/components/button">
            <Button variant="outline" size="lg">
              ← Button
            </Button>
          </Link>
          <Link href="/docs/components/date-picker">
            <Button variant="outline" size="lg">
              Date Picker →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

