import { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import { TreeNode } from "../utils/types";

const d3Chart = (data: TreeNode | null) => {
  const d3Container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const chart = new OrgChart()
        .container(`#org-chart-container`)
        .data(data as unknown[])
        .nodeWidth((d) => 250)
        .nodeHeight((d) => 175)
        .childrenMargin((d) => 40)
        .compact(false)
        .render();
    }
  }, [data]);

  return d3Container;
};

export default d3Chart;
