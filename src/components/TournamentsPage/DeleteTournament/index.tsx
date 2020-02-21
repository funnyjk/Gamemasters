import React from 'react';
import MutationButton from "../../MutationButton";
import {DELETE_TOURNAMENT, GET_TOURNAMENTS} from "../../../graphql/Tournament";
import { useHistory } from 'react-router-dom';
import Confirm, {ConfirmChildAction} from "../../Confirm";

interface IDeleteTournament {
  isEdit: boolean;
  tournamentId: string;
}

const DeleteTournament = ({tournamentId, isEdit}: IDeleteTournament) => {
  const history = useHistory();
  const deleteOptions = {
    variables: {
      tournamentId
    },
    update() {
      history.push('/tournaments')
    },
    refetchQueries: [{query: GET_TOURNAMENTS}]
  };



  // return <Confirm action={() => deleteGame({variables: {gameId}})} initState={false}>Delete</Confirm>
  return <ConfirmChildAction initState={false} label={"Delete"}>
    <MutationButton mutation={DELETE_TOURNAMENT} options={deleteOptions} text={"Confirm"} disabled={!isEdit} color={"danger"}/>
  </ConfirmChildAction>
};

export default DeleteTournament;