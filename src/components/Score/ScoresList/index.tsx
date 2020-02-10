import React from 'react';
import ScoresListItem from "./ScoresListItem";
import {useParams, matchPath, useLocation} from "react-router-dom";

interface IScoresList {
  scores: any
}

const ScoresList = ({scores}: IScoresList) => {
  const location = useLocation();
  const {params} = matchPath(location.pathname, {
    path: '/tournaments/:tournamentId/:sessionId'
  });

  return <div>
    {scores?.map((score: any, k: any) => {
      return <ScoresListItem key={k} score={score}/>
    })}
  </div>
};

export default ScoresList;