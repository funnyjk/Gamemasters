import React from 'react';
import ScoresListItem from "./ScoresListItem";
import {useParams} from "react-router-dom";

interface IScoresList {
  scores: any
}

const ScoresList = ({scores}: IScoresList) => {
  const params = useParams();

  return <div>
    sessionid
    <pre>{JSON.stringify(params, null, 2)}</pre>
    {scores?.map((score: any, k: any) => {
      return <ScoresListItem key={k} score={score}/>
    })}
  </div>
};

export default ScoresList;