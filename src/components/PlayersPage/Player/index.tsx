import React from 'react';
import _ from 'lodash';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {GET_PLAYERS} from "../PlayersList";
import { useParams, useHistory } from 'react-router-dom';
import {getPlayer, setPlayer} from "../../../graphql/Players.graphql";
import {GET_TOURNAMENTS} from "../../../graphql/Tournament";
import {Button} from "muicss/react";
import {useToggleIsEdit} from "../../../hooks/useToggleIsEdit";
import {FormControlLabel, FormGroup, Switch as ToggleSwitch} from "@material-ui/core";

const SET_PLAYER = setPlayer;

const GET_PLAYER = getPlayer;
const DELETE_PLAYER = gql`
    mutation deletePlayer($playerID: ID!) {
        deletePlayer(
            where: {
                id: $playerID
            }
        ) {
            id
        }
    }
`;


interface IPlayerComp {
  player?: any;
}
interface IScore {
  score: any
}
const Player = () => {
  let history = useHistory();
  const [setPlayer] = useMutation(SET_PLAYER);
  const [isEdit, toggleEdit] = useToggleIsEdit();

  const SetPlayerName = ({target}: any) => {
    const key = target.name;
    const value = target.value;
    setPlayer({
      variables: {
        playerData: {[key]: value},
        playerID: player.id
      }
    })
  };

  const {playerId} = useParams();
  const id = playerId || "";
  const {data} = useQuery(GET_PLAYER, ({variables: {playerId: id}}));
  const player = data?.player;
  const [deletePlayer] = useMutation(DELETE_PLAYER, {
    update(cache, {data: {deletePlayer}}) {
      const {players} = cache.readQuery({query: GET_PLAYERS});
      cache.writeQuery({
        query: GET_PLAYERS,
        data: {players: _.remove(players, (player: any)=> player.id != deletePlayer.id)}
      });
      history.push('/players');
    },
    refetchQueries: [{query: GET_TOURNAMENTS}]
  });

  const byTourn = _.groupBy(player?.scores, 'session.tournament.name');

  return <div className={"item_page"}>
    <div className={"item_page__controls"}>

    <FormGroup className={"item_page__controls__item--right"}>
      <FormControlLabel label={"Edit"} control={
        <ToggleSwitch checked={isEdit} onChange={toggleEdit}/>
      }/>
    </FormGroup>
    </div>
    <h3>{!isEdit? <span>{player?.name}</span> : <input name="name" defaultValue={player?.name} onBlur={SetPlayerName}/>}</h3>
    {isEdit && <Button color={"danger"} onClick={()=>deletePlayer({variables:{playerID:player.id}}) }>DELETE</Button>}


    {Object.entries(byTourn).map(([tournamentName, value]) => {
      return <div key={player.name + tournamentName}>
        <h4>{tournamentName}</h4>
        {
          value.map((score: any) =>
            <div key={score.id}>
              {score.session.name}: {score.session.game.name}
              <br/>
              {score.score}
            </div>
          )
        }
      </div>

    })}
  </div>
};

export default React.memo(Player);