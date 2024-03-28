import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import arrowDown from "../../../../assets/arrow_down.png";
import "./statsCard.css";

interface StatsCardProps {
  stats: any;
  pokemonName: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats, pokemonName }) => {
  const [statsOpen, setStatsOpen] = useState<boolean>(false);

  const handleButton = () => {
    setStatsOpen(!statsOpen);
  };
    
  const generateChart = () => {
    return (
      <div className="statsContainer">
        <button className="btn" onClick={handleButton}>
          <label className="statsLabel" htmlFor="arrowIcon">
            Stats
          </label>{" "}
          <img
            className={statsOpen === false ? "arrowIcon" : "arrowIconRevert"}
            src={arrowDown}
          />
        </button>
  
        {stats.length !== 0 && statsOpen && (
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
        )}
      </div>
    );
  };
  
  return generateChart();
  
};
