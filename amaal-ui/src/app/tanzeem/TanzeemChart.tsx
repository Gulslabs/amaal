"use client";
import OrganizationChart from "@dabeng/react-orgchart";
//import "@dabeng/react-orgchart/dist/style.css";
import { FC, useEffect, useState } from "react";
import { TreeNode } from "../utils/types";
import d3Chart from "./d3";

const fetchTanzeemChart = async (rehbarId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/tanzeem/momins/rehbar/${rehbarId}`,
      {
        headers: { Authorization: `Bearer ` },
      }
    );
    const records = await response.json();
    //console.log(`Results: ${JSON.stringify(records)}`);
    if (records.length === 0) {
      console.log(`No Data Found`);
    }
    return records;
  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
  }
};

const formatTanzeemChart = async (records: any[]) => {
  console.log(`Tanzeem Chart : ${JSON.stringify(records)}`);
  const nodesMap = new Map<number, TreeNode>();
  let rootNode: TreeNode | null = null;
  records.forEach((record) => {
    const n = record.n;
    const momins = record.momins;
    const relationships = record.relationships;
    // Root Node
    if (!nodesMap.has(n.identity)) {
      const rootNodeData: TreeNode = {
        identity: n.identity,
        name: `${n.firstName} ${n.lastName}`,
        title: n.audha,
        children: [],
      };
      nodesMap.set(n.identity, rootNodeData);
      rootNode = rootNodeData;
    }
    // Momims
    momins.forEach((m: any) => {
      if (!nodesMap.has(m.identity)) {
        nodesMap.set(m.identity, {
          identity: m.identity,
          name: `${m.firstName} ${m.lastName}`,
          title: m.audha,
          children: [],
        });
      }
    });
    // Relationships
    relationships.forEach((r: any) => {
      const startNode = nodesMap.get(r.start);
      const endNode = nodesMap.get(r.end);

      if (startNode && endNode) {
        startNode.children?.push(endNode);
      }
    });
  });
  if (rootNode === null) {
    throw new Error("Root node not found");
  }
  console.log(`Tree Node: ${JSON.stringify(rootNode)}`);
  return rootNode;
};

const TanzeemChart: FC = () => {
  const [tanzeemChart, setTanzeemChart] = useState<TreeNode | null>(null);
  const d3Container = d3Chart(tanzeemChart);
  useEffect(() => {
    (async () => {
      try {
        const records: any[] = await fetchTanzeemChart(
          "665ddb7d-f827-42e3-85db-eb2e66946d43"
        );
        const treeNode = await formatTanzeemChart(records);
        setTanzeemChart(treeNode);
        //console.log(`Results: ${JSON.stringify(results)}`);
      } catch (err) {
        console.log(`Momim and Relationships Error: ${err}`);
      }
    })();
  }, [tanzeemChart]);
  //return <OrganizationChart datasource={tanzeemChart} />;
  //return <OrganizationChart datasource={tanzeemChart} zoom={true} />;
  if(!tanzeemChart) return <p>Loading ...</p>
  return (
    <div style={{ width: '100%', height: '100vh' }} ref={d3Container}></div>
  );
};

export default TanzeemChart;
