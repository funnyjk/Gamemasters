import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Tournament} from "../../../../server/database/generated/prisma";
import TournamentListItem from "./TournamentListItem";
import {GET_TOURNAMENTS} from "../../../graphql/Tournament";

import './styles';

const Tournaments = () => {
    const {loading, error, data} = useQuery(GET_TOURNAMENTS);

    return <React.Fragment>
        {data?.tournaments.map((tournament: Tournament, k: any) => {
            return <TournamentListItem key={tournament.id} tournament={tournament} tournamentNumber={k}/>
        })}
    </React.Fragment>;
};

export default Tournaments;