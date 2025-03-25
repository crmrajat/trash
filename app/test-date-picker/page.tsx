"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDisplayDate } from "@/lib/date-utils"

export default function DateDisplay() {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Date Picker</CardTitle>
          <CardDescription>Select a date to display it</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? formatDisplayDate(date) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="rounded-lg bg-muted p-4 text-center">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">Selected Date:</h2>
            {date ? (
              <p className="text-2xl font-bold">{formatDisplayDate(date)}</p>
            ) : (
              <p className="text-muted-foreground">No date selected</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

