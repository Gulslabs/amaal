"use client"
import { OrgChart } from "d3-org-chart";
import { useEffect, useRef } from "react";
import orgData from "../../../public/orgData.json";

const OrgChartPage = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new OrgChart()
        .container('#chart-container')
        .data(orgData);
        

      chart.render();
    }
  }, []);

  return (
    <div>
      <h1>Organization Chart</h1>
      <div id="chart-container" ref={chartRef} />
    </div>
  );
};

export default OrgChartPage;
