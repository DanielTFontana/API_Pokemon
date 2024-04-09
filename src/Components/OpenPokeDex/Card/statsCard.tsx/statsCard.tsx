import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "./statsCard.css";

interface StatsCardProps {
  stats: any;
  pokemonName: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const [chatWidth, setChartWidth] = useState<number>(300);

  useEffect(() => {
    const handleCheckWidth = () => {
      if (window.innerWidth <= 520) {
        setChartWidth(150);
      } else {
        setChartWidth(300);
      }
    };

    window.addEventListener("resize", handleCheckWidth);

    return () => window.addEventListener("resize", handleCheckWidth);
  }, []);

  const generateChart = () => {
    return (
      <div className="statsContainer">
        {stats.length !== 0 && (
          <BarChart
            dataset={stats}
            series={[{ dataKey: "base_stat" }]}
            layout="horizontal"
            yAxis={[
              {
                scaleType: "band",
                dataKey: "name",
                tickLabelStyle: { fill: "white" },
              },
            ]}
            xAxis={[{ min: 0, max: 200, tickLabelStyle: { fill: "white" } }]}
            width={chatWidth}
            height={220}
          />
        )}
      </div>
    );
  };

  return generateChart();
};
