import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { GET_SESSION, GET_SESSION_OUT, GET_SESSION_VARS } from "../../../graphql/Session";
import './styles.scss';
import { Button, ButtonGroup, Input, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Add, Remove } from "@material-ui/icons";
import UpdateScore, { useChangeScore } from "../../Score/UpdateScore";
import ScoreInput from "../../Score/ScoreInput";

interface ISessionItem {
  id: string;
  isEdit?: boolean;
}

const SessionItem = ({id, isEdit=false}: ISessionItem) => {
  const {changeScore} = useChangeScore();
  const {loading, error, data} = useQuery<GET_SESSION_OUT, GET_SESSION_VARS>(GET_SESSION, {variables: {sessionId: id}});
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (loading) return <div>Loading</div>;
  if (!data) return <div>No Data</div>;
  const {session} = data;
  const {tournament, game, scores}= session;
  return <div className={"session_item"}>
    <div className={"session_item__body"}>
      <Table size="small">
        <TableBody>
      {scores.map((score, index)=>{
        return <TableRow key={index} className={"session_item__score"}>
          <TableCell className={"session_item__score__player"}>{score.player.player.name}</TableCell>
          <TableCell className={"session_item__score__value"}>
            {isEdit? <ScoreInput score={score}/>: <span>{score.score}</span>}
          </TableCell>
        </TableRow>
      })}
        </TableBody>
      </Table>
    </div>
    <div className={"session_item__footer"}>
      <span className={"session_item__game"}>{game.name}</span>
      <span className={"session_item__tournament"}>{tournament.name}</span>
    </div>
  </div>
};

export default SessionItem;