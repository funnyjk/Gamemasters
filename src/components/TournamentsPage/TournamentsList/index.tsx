import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Tournament} from "../../../../server/database/generated/prisma";
import TournamentListItem from "./TournamentListItem";
import {GET_TOURNAMENTS} from "../../../graphql/Tournament";

import './styles';
import {Link, useRouteMatch} from "react-router-dom";

const TournamentsList = () => {
    const match = useRouteMatch();

    const {loading, error, data} = useQuery(GET_TOURNAMENTS);

    return <React.Fragment>
        {data?.tournaments.map((tournament: Tournament, k: any) => {
            return <Link key={k} to={`${match.path}/${tournament.id}`}>
                <TournamentListItem key={tournament.id} tournament={tournament} tournamentNumber={k}/>
            </Link>;
        })}
    </React.Fragment>;
};

export default TournamentsList;