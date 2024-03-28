import React, { useState, useEffect } from "react";
import closedDex from "../../assets/pokedex_fechada-removebg-preview.png";
import "./styles.css";
import pokedex from "../../assets/Pokédex_logo.png";

interface CloseDexProps {
  openDex: boolean;
}

export const ClosedDex: React.FC<CloseDexProps> = ({ openDex }) => {
  const [openedDex, setOpenedDex] = useState<boolean>(openDex);

  useEffect(() => {
    setOpenedDex(openDex);
  }, [openDex]);

  if (openedDex) {
    return null;
  }

  return (
    <div className="dexContent">
      <img className="dexTitle" src={pokedex}/>
      <img src={closedDex} alt="" />
    </div>
  );
};
