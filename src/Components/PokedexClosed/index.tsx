import React from "react";
import closedDex from '../../assets/pokedex_fechada-removebg-preview.png'
import './styles.css'

export const ClosedDex: React.FC = ({}) => {
    return(
        <div className="divDex">
        <img src={closedDex} alt="" />
        </div>
    )
}