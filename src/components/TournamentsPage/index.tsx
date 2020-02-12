import React, {useContext, useEffect} from 'react';
import TournamentsList from "./TournamentsList";
import {Route, Switch, useRouteMatch, useParams, useLocation} from "react-router-dom";
import TournamentItem from "./TournamentItem";
import {useMutation} from "@apollo/react-hooks";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import CreateTournament from "./CreateTournament";
import Context from "../../context/pageContext/context";
import {setPage} from "../../context/pageContext/actions";

const TournamentsPage = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const locationState = location.state;
  const {dispatch} = useContext(Context);
  const title = "Tournaments";
  useDocumentTitle(title);

  useEffect(()=>{
    dispatch(setPage("tournaments"))
  }, []);

  const list_class = (locationState)? "component__list" : "component__list--sidebar";
  return <div className={"component"}>
    <div className={`tournament__list ${list_class}`}>
      <TournamentsList/>
    </div>

    <Switch>
      <Route path={`${match.path}/:tournamentId`}>
        <div className={"component__item tournament__item"}>
          <TournamentItem/>
        </div>
      </Route>
    </Switch>
  </div>;
};

export default TournamentsPage;