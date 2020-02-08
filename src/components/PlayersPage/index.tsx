import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";
import Player from "./Player";
import PlayersList, {GET_PLAYERS} from "./PlayersList";
import {CREATE_PLAYER} from "../../graphql/Players";
import {useMutation} from "@apollo/react-hooks";
import {GET_TOURNAMENTS} from "../../graphql/Tournament";


const PlayersPage = () => {
  const history = useHistory();

  const match = useRouteMatch();

  const [createPlayer] = useMutation(CREATE_PLAYER,
    {
      update(cache, {data: {createPlayer}}) {
        const {players} = cache.readQuery({query: GET_PLAYERS});
        cache.writeQuery({
          query: GET_PLAYERS,
          data: {players: players.concat([createPlayer])},
        });
        history.push(`/players/${createPlayer.id}`)
      },
      refetchQueries: [{query: GET_TOURNAMENTS}]
    });
  return <React.Fragment>

    <div className={"component--nav"}>
      <button onClick={() => createPlayer({variables: {playerName: "New Player"}})}>Add new player</button>
    </div>

    <div className={"component--list"}>
      <PlayersList/>
    </div>

    <Switch>
  <Route path={`${match.path}/:playerId`}>
    <div className={"component--item"}>
      <Player/>
    </div>
  </Route>
  <Route path={match.path}>
  </Route>
</Switch>
    </React.Fragment>;
};

export default PlayersPage;