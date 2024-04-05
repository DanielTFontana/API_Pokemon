import React, { useState } from "react";
import { Card } from "./Card";
import { ListPoke } from "./List";
import "./styles.css";

interface OpenDexProps {
  card?: React.ReactNode;
  list?: React.ReactNode;
  close: boolean;
}

export const OpenDex: React.FC<OpenDexProps> = ({ close }) => {
  const [chosenPoke, setChosenPoke] = useState<string>("");
  const [closed, setClosed] = useState<boolean>(close);

  const handleChosenPoke = (pokeName: string) => {
    setChosenPoke(pokeName);
  };
  return (
    <>
      {closed ? (
        <div className="openDexWrapper">
          <Card selectedPokemon={chosenPoke} />
          <ListPoke onPokemonSelect={handleChosenPoke} />
        </div>
      ) : null}
    </>
  );
};
