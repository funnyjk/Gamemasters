import React from 'react';
import _ from 'lodash';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {GET_PLAYERS} from "../PlayersList";
import { useParams, useHistory } from 'react-router-dom';
import {getPlayer} from "../../../graphql/Players.graphql";
import {GET_TOURNAMENTS} from "../../../graphql/Tournament";
import {Button} from "muicss/react";
import {useToggleIsEdit} from "../../../hooks/useToggleIsEdit";
import {FormControlLabel, FormGroup, Switch as ToggleSwitch} from "@material-ui/core";
import MutationInput from "../../MutationInput";
import {DELETE_PLAYER, DELETE_PLAYER_VARS, GET_PLAYER, GET_PLAYER_VARS, UPDATE_PLAYER} from "../../../graphql/Players";

const Player = () => {
  let history = useHistory();
  const [isEdit, toggleEdit] = useToggleIsEdit();

  const {playerId} = useParams();
  const id = playerId || "";
  const {loading, error, data} = useQuery<any, GET_PLAYER_VARS>(GET_PLAYER, ({variables: {playerId: id}}));
  const [deletePlayer] = useMutation<any, DELETE_PLAYER_VARS>(DELETE_PLAYER, {
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


  const updateOptions = {
    variables: {playerId}
  }
  
  if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if(loading) return null;
  if(!data) return <div>No Player</div>;

  const {player} = data;
  const byTourn = _.groupBy(player?.scores, 'session.tournament.name');


  return <div className={"item_page"}>
    <div className={"item_page__controls"}>

    <FormGroup className={"item_page__controls__item--right"}>
      <FormControlLabel label={"Edit"} control={
        <ToggleSwitch checked={isEdit} onChange={toggleEdit}/>
      }/>
    </FormGroup>
    </div>
    <h3>{!isEdit ? <span>{player?.name}</span> :
      <MutationInput mutation={UPDATE_PLAYER} options={updateOptions} type={"text"} name={"name"} defaultValue={player.name}
                     optionsData={"playerData"}/>}</h3>

    {isEdit && <Button color={"danger"} onClick={()=>deletePlayer({variables:{playerId}}) }>DELETE</Button>}

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