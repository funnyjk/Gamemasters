import React, {useContext} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {NavLink, Route, useHistory, useParams, useRouteMatch, Switch} from "react-router-dom";
import {GET_TOURNAMENT, GET_TOURNAMENTS, UPDATE_TOURNAMENT} from "../../../graphql/Tournament";
import CreateTournamentPlayer from "../../TournamentPlayer/createTournamentPlayer";
import _ from "lodash";
import {GET_PLAYERS} from "../../PlayersPage/PlayersList";
import DeleteTournamentPlayer from "../../TournamentPlayer/deleteTournamentPlayer";
import TournamentPlayers from "../../TournamentPlayer";

import './style';
import Sessions from "../../Sessions";
import MutationInput from "../../MutationInput";
import {useToggle} from "../../../hooks/useToggle";
import DeleteTournament from "../DeleteTournament";

import {FormControlLabel, FormGroup, Switch as ToggleSwitch} from '@material-ui/core'
import Context from "../../../context/pageContext/context";
import {useToggleIsEdit} from "../../../hooks/useToggleIsEdit";
import {Form} from "muicss/react";
import CreateSession from "../../Sessions/CreateSession";
import TournamentTable from "../TournamentTable";

const TournamentItem = () => {
    // const {state, dispatch} = useContext(Context);
    const match = useRouteMatch();
    const [isEdit, toggleEdit] = useToggleIsEdit();

    const {tournamentId} = useParams();
    const getTournament = useQuery(GET_TOURNAMENT, {variables: {tournamentId}});
    const getPlayers = useQuery(GET_PLAYERS);
    const tournament = getTournament.data?.tournament;
    const players = getPlayers.data?.players;
    const players_in_tournament = _.flatMap(tournament?.players).map(({player}: any) => {
        return player;
    });

    const players_not_in_tournament = _.differenceBy(players, players_in_tournament, 'id');

    const options = {
        variables:{tournamentId},
        refetchQueries: [
            {query: GET_TOURNAMENT, variables: {tournamentId}},
            {query: GET_TOURNAMENTS}
        ]
    };

    if(getTournament.error) return <pre>{JSON.stringify(getTournament.error, null, 2)}</pre>;
    if(getTournament.loading) return <div>Loading</div>;
    if(!tournament) return <div>No Tournament</div>;

    return <div className={"item_page"}>
        <div className={"item_page__controls"}>
            <div className={"item_page_controls__item"}>
                {(isEdit)?
                  <div className={"flex-inline"}>
                      <MutationInput mutation={UPDATE_TOURNAMENT} optionsData="tournamentData" options={options}
                                          type={"text"} name={"name"} defaultValue={tournament.name}
                                          disabled={!isEdit} label={"Tournament Name"}/>
                      <DeleteTournament isEdit={isEdit} tournamentId={tournamentId}/>
                  </div>
                    : <h3>{tournament.name}</h3> }
            </div>

        <FormGroup className={"item_page__controls__item--right"}>
            <FormControlLabel label={"Edit"} control={
                <ToggleSwitch checked={isEdit} onChange={toggleEdit}/>
            }/>
        </FormGroup>

        <div className={"item_page__item"}>
            {/*<div className={"tournament-item--tournament-player-list"}>*/}
            {/*{tournament?.players.map((tournamentPlayer:any, k: any) => {*/}
            {/*    // return <div className={"tournament-item--tournament-player-list--item"} key={k}>*/}
                    {/*// <DeleteTournamentPlayer tournamentPlayer={tournamentPlayer} tournament={tournament} disabled={!isEdit}/>*/}
                {/*// </div>*/}
            {/*})}*/}
            {/*</div>*/}
            <div className={"mui-list--inline"}>
                <li>
                    <NavLink to={`${match.url}/players`} className={"mui-btn mui-btn--primary"}>Players</NavLink>
                </li>
                <li className={"nav__item"}>
                    <NavLink to={`${match.url}/sessions`} className={"mui-btn mui-btn--primary"}>Sessions</NavLink>
                </li>
            </div>
        </div>
        </div>

            <div className={"component"}>
            <Switch>
                <Route exact path={`${match.path}/sessions`}>
                    <Sessions tournament={tournament}/>
                    <div className={"component__item"}>
                        <CreateSession tournament={tournament}/>
                    </div>
                </Route>

                <Route exact path={`${match.path}/players`}>
                    <TournamentPlayers tournamentId={tournamentId}/>
                    <div className={"component__item"}>
                      <CreateTournamentPlayer playerList={players_not_in_tournament} tournament={tournament}/>
                    </div>
                </Route>
                <Route path={`${match.path}/sessions`}>
                    <Sessions tournament={tournament}/>
                </Route>
                <Route path={`${match.path}/players`}>
                    <TournamentPlayers tournamentId={tournamentId}/>
                </Route>

                <Route path={`${match.path}`}>
                    <TournamentTable tournamentId={tournamentId}/>
                </Route>
            </Switch>
            </div>
    </div>
};

export default React.memo(TournamentItem);