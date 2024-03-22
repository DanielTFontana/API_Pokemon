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
import { BarChart } from "@mui/x-charts/BarChart";

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
};

interface CardProps {
  selectedPokemon: string;
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
      effort: stat.effort,
    }));
    setStatsOrganized(statsArray);
  };

  console.log(statsOrganized);

  // const generateChart = (data: []) => {
  //   return(

  //   )
  // }

  const chartSetting = {
    xAxis: [
      {
        label: "Pokemon Stats",
      },
    ],
    width: 500,
    height: 400,
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
      // generateChart(statsOrganized)
    }
  }, [pokemon]);

  return (
    <div className="biggerCard">
      <p className="pokeName">{pokemon.name}</p>
      <div>
        {renderTypeImages()}
        {pokeType.length === 1 && <img src={PokemonTypes[""]} alt="" />}
      </div>
      <div onClick={transformPoke} className="pokeNball">
        {dataOn == true && (
          <img
            className="poke"
            src={
              pokemon?.sprites.versions["generation-v"]["black-white"].animated[
                `front_${transform}`
              ]
            }
          />
        )}
        <img className="pokeball" src={pokeball} />
      </div>
      <div className="cardStats">
        <BarChart
          dataset={statsOrganized}
          series={[{ dataKey: "nome", label: pokemon.name + "status" }]}
          layout="horizontal"
          yAxis={[
            {
              scaleType: "band",
              dataKey: "Pokemon",
            },
          ]}
        />
      </div>
    </div>
  );
};
