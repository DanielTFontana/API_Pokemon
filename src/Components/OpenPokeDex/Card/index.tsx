import React, { useEffect, useState } from "react";
import "./styles.css";
import pokeball from "../../../assets/pokeball2.png";
import API from "../../../service/service";
import normal from "../../../assets/normal.png";
import fire from "../../../assets/fire.png";
import water from "../../../assets/water.png";
import electric from "../../../assets/electric.png";
import grass from "../../../assets/grass.png";
import ice from "../../../assets/ice.png";
import fighting from "../../../assets/fighting.png";
import poison from "../../../assets/poison.png";
import ground from "../../../assets/earth.png";
import flying from "../../../assets/fly.png";
import psychic from "../../../assets/psy.png";
import bug from "../../../assets/bug.png";
import rock from "../../../assets/rock.png";
import ghost from "../../../assets/ghost.png";
import dragon from "../../../assets/dragon.png";
import steel from "../../../assets/steel.png";
import fairy from "../../../assets/fairy.png";
import dark from "../../../assets/dark.png";
import { StatsCard } from "./statsCard.tsx/statsCard";
import choosePoke from "../../../assets/choose_pokemon-removebg-preview.png";
import { Tooltip } from "@mui/material";

const PokemonTypes: any = {
  normal,
  fire,
  water,
  electric,
  grass,
  ice,
  fighting,
  poison,
  ground,
  flying,
  psychic,
  bug,
  rock,
  ghost,
  dragon,
  steel,
  fairy,
  dark,
};

interface CardProps {
  selectedPokemon: string;
  pokemonName?: string;

}

interface PokeData {
  data: any;
  stats: [PokemonStat];
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: "";
    url?: "";
  };
}

export const Card: React.FC<CardProps> = ({ selectedPokemon }) => {
  const [pokemon, setPokemon] = useState<any>([]);
  const [dataOn, setDataOn] = useState<boolean>(false);
  const [transform, setTransform] = useState("default");
  const [pokeType, setPokeType] = useState<string[]>([]);
  const [statsOrganized, setStatsOrganized] = useState<any>([]);
  const [charAvaliable, setChartAvaliable] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: PokeData = await API.get(`/${selectedPokemon}`);
        setPokemon(data);
        generteStats(data);
        setDataOn(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedPokemon) {
      fetchData();
    }
  }, [selectedPokemon]);

  const transformPoke = () => {
    transform === "default" ? setTransform("shiny") : setTransform("default");
  };

  const mapingPokeTypes = (pokemons: any) => {
    let arrayType: string[] = [];
    pokemons?.types?.map((types: any) => {
      arrayType.push(types.type.name);
      setPokeType(arrayType);
    });
  };

  const generteStats = (data: PokeData) => {
    const statsArray: any[] = data.stats.map((stat) => ({
      base_stat: stat.base_stat,
      name: stat.stat.name,
    }));
    setStatsOrganized(statsArray);
  };

  const renderTypeImages = () => {
    return pokeType.map((type, index) => (
      <img
        className="pokeTypes"
        key={index}
        src={PokemonTypes[type]}
        alt={type}
      />
    ));
  };

  useEffect(() => {
    if (pokemon) {
      mapingPokeTypes(pokemon);
      setChartAvaliable(true);
    }
    if (pokemon.name) {
      setTransform("default");
    }
  }, [pokemon]);

  const FirstLatterUpper = (str: string) => {
    return str && str[0].toUpperCase() + str.slice(1)
  };
FirstLatterUpper(pokemon.name)
  return (
    <div className="biggerCard">
      <p className="pokeName">{FirstLatterUpper(pokemon.name)}</p>
      <div>
        {renderTypeImages()}
        {pokeType.length === 1 ? (
          <img src={PokemonTypes[""]} alt="" />
        ) : (
          pokeType.length === 0 && (
            <img
              className="choosePokeStyle"
              src={choosePoke}
              alt="choose you poke"
            />
          )
        )}
      </div>
      <div>
        <Tooltip title="Click to shiny">
          <div onClick={transformPoke} className="pokeNball">
            {dataOn == true && (
              <img
                className="poke"
                src={
                  pokemon?.sprites.versions["generation-v"]["black-white"]
                    .animated[`front_${transform}`]
                }
              />
            )}
            <img className="pokeball" src={pokeball} />
          </div>
        </Tooltip>
        <div>
          {charAvaliable && (
            <StatsCard
              stats={statsOrganized || []}
              pokemonName={pokemon.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};
