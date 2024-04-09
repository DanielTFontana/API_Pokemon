import React, { useState } from "react";
import { Card } from "./Card";
import { ListPoke } from "./List";
import "./styles.css";

interface OpenDexProps {
  card?: React.ReactNode;
  list?: React.ReactNode;
  close: boolean;
  onCloseDex: (state: boolean) => void
}

export const OpenDex: React.FC<OpenDexProps> = ({ close, onCloseDex }) => {
  const [chosenPoke, setChosenPoke] = useState<string>("");
  const [closed, setClosed] = useState<boolean>(close);

  const handleChosenPoke = (pokeName: string) => {
    setChosenPoke(pokeName);
  };

  const handleClose = () => {
    setClosed(true)
    onCloseDex(true)
  }

  return (
    <>
      {closed ? (
        <div className="openDexWrapper">
          <Card selectedPokemon={chosenPoke} />
          <ListPoke onCloseDex={handleClose} onPokemonSelect={handleChosenPoke} />
        </div>
      ) : null}
    </>
  );
};
