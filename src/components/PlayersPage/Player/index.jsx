import React from 'react';
import Tournament from "../Tournament";

const Player = ({player}) => {
    return <div>
        {player.name}:
        {player.tournaments.map(({tournament}) => <Tournament tournament={tournament}/>)}
    </div>
};

export default React.memo(Player);