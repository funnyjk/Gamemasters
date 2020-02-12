import React from 'react';
import MutationButton from "../../MutationButton";
import {DELETE_TOURNAMENT, GET_TOURNAMENTS} from "../../../graphql/Tournament";
import { useHistory } from 'react-router-dom';

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

  return <MutationButton mutation={DELETE_TOURNAMENT} options={deleteOptions} text={"Delete"} disabled={!isEdit}/>

};

export default DeleteTournament;