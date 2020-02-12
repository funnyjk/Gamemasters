import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import Card from "../Player/Card";


import {getPlayers} from '../../../graphql/Players.graphql';
import {Link, useHistory, useRouteMatch, useParams, useLocation} from "react-router-dom";
import {GET_TOURNAMENTS} from "../../../graphql/Tournament";
import {CREATE_PLAYER} from "../../../graphql/Players";
import { Button } from 'muicss/react';
import PlayerListItem from "./PlayerListItem";

export const GET_PLAYERS = getPlayers;

interface IPlayerQuery {
  loading: any;
  error: any;
  data: any;
}

const PlayersList = () => {
  let history = useHistory();
  const match = useRouteMatch();
  const playerId = "";
  const {loading, error, data} = useQuery(GET_PLAYERS);
  const [createPlayer, createPlayerData] = useMutation(CREATE_PLAYER,
    {
      update(cache, {data: {createPlayer}}) {
        const {players} = cache.readQuery({query: GET_PLAYERS});
        cache.writeQuery({
          query: GET_PLAYERS,
          data: {players: players.concat([createPlayer])},
        });
        history.push(`/players/${createPlayer.id}`)
      },
      refetchQueries:[{query: GET_TOURNAMENTS}]
    });


  return <React.Fragment>
    {data?.players.map((player: any, k: any) => {
      return <Link key={k} to={`${match.path}/${player.id}`}>
        <PlayerListItem  player={player}/>
      </Link>
    })}

  </React.Fragment>;
};

export default PlayersList;