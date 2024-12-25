"use client";
import { FC, useState } from "react";
import { AmaalTrackerProps } from "../utils/types";
import { getWeekBounds } from "../utils/utils";
import DatePicker from "./DatePicker";
import DayAmaalTable from "./DayAmaalTable";
import UserProfile from "./UserProfile";

/**
 * This seem to be the only way. https://www.reddit.com/r/nextjs/comments/16b6ozn/setting_cookies_in_nextjs_13_do_you_have_fetch_a/?rdt=47395&onetap_auto=true&one_tap=true
 */
const AmaalTracker: FC<AmaalTrackerProps> = ({ token }) => {
  const [weekRange, setWeekRange] = useState<{
    startOfWeek: string;
    endOfWeek: string;
  }>(() => {
    return getWeekBounds(new Date());
  });

  const onDateChange = (date: string) => {
    const selectedDate = new Date(date);
    const { startOfWeek, endOfWeek } = getWeekBounds(selectedDate);
    console.log(`StartOfWeek: ${startOfWeek}, EndOfWeek: ${endOfWeek}`);
    setWeekRange({ startOfWeek: startOfWeek, endOfWeek: endOfWeek });
  };
  return (
    <div>
      <div>
        <DatePicker onDateChange={onDateChange} />
      </div>
      <div className="flex items-start justify-center pt-2">
        <h1 className="text-4xl font-bold">Amaal Tracker</h1>
      </div>
      <div>
        <UserProfile token={token} />
      </div>
      <DayAmaalTable
        token={token}
        startOfWeek={weekRange?.startOfWeek || ""}
        endOfWeek={weekRange?.endOfWeek || ""}
      />
    </div>
  );
};
export default AmaalTracker;
