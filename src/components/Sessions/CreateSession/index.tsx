import React, {useState} from 'react';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {CREATE_SESSION, CREATE_SESSION_VARS, GET_TOURNAMENT_SESSIONS} from "../../../graphql/Session";
import {GET_TOURNAMENTS} from "../../../graphql/Tournament";
import {GET_GAMES} from "../../../graphql/Game";
import GamesSelect from "../../GamesPage/GamesSelect";
import {Button} from "muicss/react";
import {FormControl, FormGroup} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import { useHistory } from 'react-router-dom';

interface ICreateSession {
  tournament: any;
}

const CreateSession = ({tournament}: ICreateSession) => {
  const history = useHistory();
  const {data} = useQuery(GET_GAMES);
  const [createSession] = useMutation<any, CREATE_SESSION_VARS>(CREATE_SESSION, {
    update(cache, {data: {createSession}}) {
      console.log(data)
      history.push(`/tournaments/${tournament.id}/sessions/${createSession.id}`);
    },
    refetchQueries: [{query: GET_TOURNAMENT_SESSIONS, variables:{tournamentId: tournament?.id}}]
  });
  const [gameId, setGameId] = useState("");
  const selectedGameId = ({target}: any) => {
    setGameId(target.value);
  };

  if(!data) return <div>NO DATA</div>;
  
  const {games} = data;
  return <FormGroup>
    <GamesSelect value={gameId} onChange={selectedGameId}/>

    <Button variant={"primary"} disabled={(gameId.length == 0)}
            onClick={() => createSession({variables: {tournamentId: tournament.id, gameId, name: "New Session"}})}>
        <Add/>
    </Button>
    </FormGroup>
};

export default CreateSession;