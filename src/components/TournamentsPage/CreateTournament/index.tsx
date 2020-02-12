import React from 'react';
import {Button} from 'muicss/react';
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_TOURNAMENT, CREATE_TOURNAMENT_VARS, GET_TOURNAMENTS} from "../../../graphql/Tournament";
import {Add} from "@material-ui/icons";

interface ICreateTournament {

}

export const useCreateTournament = (tournamentName: string) => {
  const history = useHistory();

  const [createTournament] = useMutation<any, CREATE_TOURNAMENT_VARS>(CREATE_TOURNAMENT, {
      update(cache, {data: {createTournament}}) {
        const {tournaments} = cache.readQuery({query: GET_TOURNAMENTS});
        cache.writeQuery({
          query: GET_TOURNAMENTS,
          data: {
            tournaments: tournaments.concat([createTournament])
          }
        })
        history.push(`/tournaments/${createTournament.id}`)
      },
      variables: {tournamentName}
    }
  );
  return createTournament;
};

const CreateTournament = ({}: ICreateTournament) => {
  const createTournament = useCreateTournament("New Tournament");
  return <Button variant={"fab"} onClick={() => createTournament()}>
    <Add/>
  </Button>;
};

export default CreateTournament;