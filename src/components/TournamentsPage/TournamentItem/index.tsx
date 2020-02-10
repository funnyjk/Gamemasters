import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {useHistory, useParams} from "react-router-dom";
import {DELETE_TOURNAMENT, GET_TOURNAMENT, GET_TOURNAMENTS, UPDATE_TOURNAMENT} from "../../../graphql/Tournament";
import CreateTournamentPlayer from "../../TournamentPlayer/createTournamentPlayer";
import _ from "lodash";
import {GET_PLAYERS} from "../../PlayersPage/PlayersList";
import DeleteTournamentPlayer from "../../TournamentPlayer/deleteTournamentPlayer";
import TournamentPlayer from "../../TournamentPlayer";

import './style';
import Sessions from "../../Sessions";
import MutationInput from "../../MutationInput";
import {GET_SESSION, GET_TOURNAMENT_SESSIONS} from "../../../graphql/Session";
import MutationButton from "../../MutationButton";

const TournamentItem = () => {
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
        refetchQueries: [{
            query: GET_TOURNAMENT, variables: {tournamentId}
        }]
    };

    if(!tournament) return <div>No Tournament</div>;
    const deleteOptions = {
        variables: {
            tournamentId
        },
        refetchQueries: [{query: GET_TOURNAMENTS}]
    }
    return <div>
        <h3>{tournament?.name}</h3>
        <MutationButton mutation={DELETE_TOURNAMENT} options={deleteOptions} text={"Delete"}/>
        <MutationInput mutation={UPDATE_TOURNAMENT} optionsData="tournamentData" options={options} type={"text"} name={"name"} defaultValue={tournament.name}/>

        <div className={"tournament-item--tournament-player-list"}>
        {tournament?.players.map((tournamentPlayer:any, k: any) => {
            return <div className={"tournament-item--tournament-player-list--item"} key={k}>
                <TournamentPlayer value={tournamentPlayer}/>
                <DeleteTournamentPlayer tournamentPlayer={tournamentPlayer} tournament={tournament}/>
            </div>
        })}
        </div>
        <CreateTournamentPlayer playerList={players_not_in_tournament} tournament={tournament}/>

        <Sessions tournament={tournament}/>
    </div>
};

export default React.memo(TournamentItem);