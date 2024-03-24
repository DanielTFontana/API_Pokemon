import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

interface StatsCardProps {
  stats: any; 
  pokemonName: string; 
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats, pokemonName }) => {
  const generateChart = () => {
    if (stats.length === 0) {
      return null;
    }
    return (
      <div className="cardStats">
        <BarChart
          dataset={stats}
          series={[{ dataKey: "base_stat", label: `${pokemonName} status` }]}
          layout="horizontal"
          yAxis={[
            {
              scaleType: "band",
              dataKey: "name",
            },
          ]}
          xAxis={[{ min: 0, max: 200 }]}
          width={350}
          height={300}
        />
      </div>
    );
  };

  return generateChart();
};

