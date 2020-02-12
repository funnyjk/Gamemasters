import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {GET_SCORE, GET_SCORE_VARS} from "../../../graphql/Score";
import UpdateScore from "../UpdateScore";
import DeleteScore from "../DeleteScore";
import { useParams } from 'react-router-dom';

interface IScoreItem {
}

const ScoreItem = ({}: IScoreItem) => {
  const {scoreId} = useParams();
  // const [score, setScore] = useState({} as any);

  const {loading, error, called, data} = useQuery<any, GET_SCORE_VARS>(GET_SCORE, {
    variables:{scoreId},
    fetchPolicy: "no-cache"
  });

    // useEffect(()=> {
  //   if(called && !loading) {
  //     setScore(data.score)
  //   }
  // }, [data]);

  if(loading) return <div>Loading</div>;
  if(!data) return <div>Not Found</div>;
  const {score} = data;
  const {player} = score.player;

  return <div>
    {player.name}
    <UpdateScore score={score}/>
    <DeleteScore/>
  </div>
};

export default ScoreItem;