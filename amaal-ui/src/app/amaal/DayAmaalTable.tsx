"use client";
import { FC, useEffect, useState } from "react";
import { DayAmaal, DayAmaalsTableProps } from "../utils/types";
import DayAmaalRow from "./DayAmaalRow";

const DayAmaalTable: FC<DayAmaalsTableProps> = ({
  token,
  startOfWeek,
  endOfWeek,
}) => {
  const [dayAmaals, setDayAmaals] = useState<DayAmaal[]>([]);
  useEffect(() => {
    fetchDayAmaals(startOfWeek, endOfWeek);
  }, [startOfWeek, endOfWeek]); // Empty Array for initial loading only.
  const fetchDayAmaals = async (startOfWeek: string, endOfWeek: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/amaal?startOfWeek=${startOfWeek}&endOfWeek=${endOfWeek}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(`Token in DayAmaalTable: ${token}`);
      const data: DayAmaal[] = await response.json();
      console.log("Fetched Amaals:", data); // Debugging line
      setDayAmaals(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 space-y-6">
      {dayAmaals.map((dayAmaal, i) => (
        <DayAmaalRow key={i} dayAmaal={dayAmaal} token={token}/>
      ))}
    </div>
  );
};

export default DayAmaalTable;
