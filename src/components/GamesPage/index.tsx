import React, {useContext, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import CreateGame from './CreateGame';
import GamesList from "./GamesList";
import GameItem from "./GameItem";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {setPage} from "../../context/pageContext/actions";
import Context from "../../context/pageContext/context";


const GamesPage = () => {
  const {state} = useLocation();
  const {dispatch} = useContext(Context);

  useDocumentTitle("Games");
  useEffect(() => {
    dispatch(setPage("games"))
  }, []);

  const match = useRouteMatch();

  const list_class = (state) ? "component__list" : "component__list--sidebar";

  return <div className={"component"}>
    <div className={`${list_class}`}>
      <GamesList/>
    </div>
    <Switch>
      <Route path={`${match.path}/:gameId`}>
        <div className={"component__item"}>
          <GameItem/>
        </div>
      </Route>
    </Switch>
  </div>;
};

export default GamesPage;