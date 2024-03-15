import React from "react";


interface OpenDexProps {
    card?: React.ReactNode;
    list?: React.ReactNode;
  }

export const OpenDex: React.FC<OpenDexProps> = ({card, list}) => {
    return(
        <div className="wrapper">
            {card}
            {list}
             </div>
    )
}