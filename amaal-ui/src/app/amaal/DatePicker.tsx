'use client'
import { FC } from "react";

interface DatePickerProps {
//  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DatePicker: FC<DatePickerProps> = ({ onDateChange }) => {
  return (
    <input
      type="date"      
      onChange={(e) => onDateChange(e.target.value)}
    />
  );
};

export default DatePicker;
