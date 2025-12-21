"use client"

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
}

