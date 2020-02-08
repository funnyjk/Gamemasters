import React, {useEffect, useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {GET_SCORE, UPDATE_SCORE, UPDATE_SCORE_VARS} from "../../../graphql/Score";
import { useParams } from 'react-router-dom';

interface IUpdateScore {
  score: any;
}

const UpdateScore = ({score}: IUpdateScore) => {
  const {scoreId} = useParams();

  const [scoreValue, setScoreValue] = useState(score.score || 0);
  const [updateScore] = useMutation<any, UPDATE_SCORE_VARS>(UPDATE_SCORE, {
    // refetchQueries: [{query: GET_SCORE, variables:{scoreId}}]
  });

  const changeScore = ({target}: any) => {
    const {name} = target;
    let value = target.value;
    if(name == "score") {
      value = parseInt(target.value);
    }
    updateScore({variables:{
        scoreData: {[name]: value},
        scoreId: score.id
      }})
  };
  if(!score) return <div>No Score</div>;
  const inputScore = ({target}: any) => {
    const {value} = target;
    setScoreValue(value);
  };

  useEffect(()=> {
    setScoreValue(score.score);
  }, [score]);

  return <div>
    <input name="score" type={"number"} value={scoreValue || 0} onChange={inputScore} onBlur={changeScore}/>
  </div>
};

export default UpdateScore;