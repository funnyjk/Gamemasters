import React, {useEffect, useState} from 'react';
import './styles';
import {useMutation} from "@apollo/react-hooks";
import {GET_SCORE, GET_SCORES_SESSION, UPDATE_SCORE, UPDATE_SCORE_VARS} from "../../../graphql/Score";
import { useParams } from 'react-router-dom';
import {GET_TOURNAMENT_SCORES} from "../../../graphql/Tournament";
import {Input} from "@material-ui/core";

interface IUpdateScore {
  score: any;
}

export const useChangeScore = () => {
  const [updateScore] = useMutation<any, UPDATE_SCORE_VARS>(UPDATE_SCORE);
  const changeScore = (scoreId: string, value: number) => {
    updateScore({
      variables: {
        scoreData: {score: +value || 0},
        scoreId
      }
    })
  };
  return {
    changeScore
  }
};

const UpdateScore = ({score}: IUpdateScore) => {
  const {tournamentId} = useParams();
  const [scoreValue, setScoreValue] = useState(+score.score || 0);
  const [updateScore] = useMutation<any, UPDATE_SCORE_VARS>(UPDATE_SCORE, {
    refetchQueries: [
      {query: GET_SCORE, variables:{scoreId: score.id}},
      {query: GET_TOURNAMENT_SCORES, variables:{tournamentId}}
      ]
  });

  const changeScore = ({target}: any) => {
    const {name} = target;
    let value = target.value;
    if(name == "score") {
      value = parseInt(target.value);
    }
    updateScore({variables:{
        scoreData: {[name]: +value || 0},
        scoreId: score.id
      }})
  };
  if(!score) return <div>No Score</div>;
  const inputScore = ({target}: any) => {
    const {value} = target;
    setScoreValue(value);
  };

  useEffect(()=> {
    setScoreValue(+score.score || 0);
  }, [score]);

  return <Input className={"update-score"} name="score" type={"number"} value={scoreValue} onChange={inputScore} onBlur={changeScore}/>
};

export default UpdateScore;

