import React, {useContext, useEffect} from 'react';
import {
  Switch,
  Route,
  useRouteMatch, useLocation,
} from "react-router-dom";
import Player from "./Player";
import PlayersList, {GET_PLAYERS} from "./PlayersList";

import useDocumentTitle from "../../hooks/useDocumentTitle";
import CreatePlayer from "./CreatePlayer";
import {setPage} from "../../context/pageContext/actions";
import Context from "../../context/pageContext/context";


const PlayersPage = () => {
  const {state} = useLocation();
  const {dispatch} = useContext(Context);
  useEffect(()=> {
    dispatch(setPage("players"))
  }, []);

  const match = useRouteMatch();

  useDocumentTitle("Players");
  const list_class = (state) ? "component__list" : "component__list--sidebar";

  return <div className={"component"}>
    <div className={`${list_class}`}>
      <PlayersList/>
    </div>

    <Switch>
  <Route path={`${match.path}/:playerId`}>
    <div className={"component__item"}>
      <Player/>
    </div>
  </Route>
</Switch>
    </div>;
};

export default PlayersPage;