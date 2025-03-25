"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatDisplayDate } from "@/lib/date-utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

interface DatePickerProps {
  name: string
  control: any
  label: string
  placeholder?: string
  disabled?: boolean
}

export function FormDatePicker({ name, control, label, placeholder, disabled }: DatePickerProps) {
  // Initialize date state outside the render function
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Update date when field value changes externally
        React.useEffect(() => {
          if (field.value) {
            setDate(new Date(field.value))
          } else {
            setDate(undefined)
          }
        }, [field.value])

        // Update form value when date changes
        React.useEffect(() => {
          if (date) {
            field.onChange(date.toISOString().split("T")[0])
          } else {
            field.onChange(undefined) // Or null, depending on your form library's requirements
          }
        }, [date, field])

        return (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn("w-full pl-3 text-left font-normal", !date && "text-muted-foreground")}
                    disabled={disabled}
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? formatDisplayDate(date) : <span>{placeholder || "Pick a date"}</span>}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

