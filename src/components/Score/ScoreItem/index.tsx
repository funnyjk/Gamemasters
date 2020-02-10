import React, {useEffect, useState} from 'react';
import {useParams, useRouteMatch} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {GET_SCORE, GET_SCORE_VARS} from "../../../graphql/Score";
import UpdateScore from "../UpdateScore";
import DeleteScore from "../DeleteScore";

interface IScoreItem {
}

const ScoreItem = ({}: IScoreItem) => {
  const [score, setScore] = useState({
    id: "",
    player: {
      id: "",
      player: {name:""}
    },
    score: 0
  });

  const {scoreId} = useParams();
  const {loading, error, called, data} = useQuery<any, GET_SCORE_VARS>(GET_SCORE, {
    variables:{scoreId},
    fetchPolicy: "no-cache"
  });

  useEffect(()=> {
    if(called && !loading) {
      setScore(data.score)
    }
  }, [data]);

  if(!data) return <div>Not Found</div>;
  const {player} = score.player;
  return <div>
    {player.name}
    <UpdateScore score={score}/>
    <DeleteScore/>
  </div>
};

export default ScoreItem;