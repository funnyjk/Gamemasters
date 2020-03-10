import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SCORE, UPDATE_SCORE_VARS } from "../../../graphql/Score";
import { Button, ButtonGroup } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

interface IScoreInput {
  score: {
    id: string;
    score: number;
  };
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

const ScoreInput = ({score}: IScoreInput) => {
  const [value, setValue] = useState(score.score);
  const {changeScore} = useChangeScore();
  return <ButtonGroup color="primary" aria-label="outlined primary button group">
    <Button onClick={() => {
      changeScore(score.id, value - 1);
      setValue(value - 1);
    }}><Remove/></Button>
    <input value={value} type="number" onChange={({target}) => {
      changeScore(score.id, +target.value);
      setValue(+target.value)
    }}/>
    <Button onClick={() => {
      changeScore(score.id, value + 1);
      setValue(value + 1);
    }}><Add/></Button>
  </ButtonGroup>
};

export default ScoreInput;