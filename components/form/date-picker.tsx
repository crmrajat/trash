"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
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
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                  disabled={disabled}
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? format(new Date(field.value), "PPP") : <span>{placeholder || "Pick a date"}</span>}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  field.onChange(date ? date.toISOString().split("T")[0] : "")
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

