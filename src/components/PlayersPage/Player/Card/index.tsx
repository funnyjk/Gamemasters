import React, {useEffect, useState} from 'react';
import './style.scss';
import {gql} from "apollo-boost";
import {Link, useRouteMatch} from "react-router-dom";
import { Panel } from 'muicss/react';

const SET_PLAYER_NAME = gql`
    mutation SetPlayerName($playerName: String, $playerID: ID) {
        updatePlayer(
            data: {
                name: $playerName
            }
            where: {id: $playerID}
        ) {
            id
            name
            pic

        }
    }
`;

interface IPlayer {
  id: string;
  name: string;
  pic?: string;
}
const getAltPic = () => "https://i.pravatar.cc/200";

interface ICard {
  player: IPlayer;
  children: any;
}
const Card = ({player, children}:ICard) => {
  const [altPic, setAltPic] = useState("");


  useEffect(()=> {
   setAltPic(getAltPic());
  });
  const match = useRouteMatch();

  return <Panel className="">

    <header className="c-card__header">
      {/*<img src={player?.pic || altPic } className="c-card__image" alt="Card Image"/>*/}
    </header>

    <div className="c-card__body">
      <h2 className="c-card__title">
          <Link to={`${match.path}/${player.id}`}>{player.name}</Link>
      </h2>
      <p className="c-card__subtitle">
        {player?.pic}
      </p>
      <div className="c-card__intro">
        {children}
      </div>
    </div>

    <footer className="c-card__footer">
      Footer
    </footer>

  </Panel>
};

export default React.memo(Card);