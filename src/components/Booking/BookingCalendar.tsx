"use client";

import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { DateRange, Matcher } from "react-day-picker";

export default function BookingCalendar() {
    const [selectedDates, setSelectedDates] = useState<DateRange>();

    const bookedDates: Matcher = [
        new Date("2024-10-21"),
        new Date("2024-10-30"),
        new Date("2024-10-31"),
    ]
  return (
    <div className="relative w-full">
        <Calendar
            className="rounded-md border shadow relative"
            mode="range"
            selected={selectedDates}
            onSelect={(range) => {
                if(range && range.from !== undefined && range.to !== undefined) {
                    const from = range.from;
                    const to = range.to;
                    const isBooked = bookedDates.some((date) => from < date && to > date );
                    if(isBooked) {
                        return;
                    }
                }
                setSelectedDates(range);
            }}
            fromDate={new Date()}
            disabled={bookedDates}
        />
    </div>
  )
}

