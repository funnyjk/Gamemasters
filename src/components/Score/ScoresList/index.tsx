import React from 'react';
import ScoresListItem from "./ScoresListItem";
import {useParams, matchPath, useLocation} from "react-router-dom";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

interface IScoresList {
  scores: any
}

const ScoresList = ({scores}: IScoresList) => {
  const location = useLocation();
  const {params} = matchPath(location.pathname, {
    path: '/tournaments/:tournamentId/:sessionId'
  });
  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>Player</TableCell>
        <TableCell>Score</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {scores?.map((score: any, k: any) => {
        return <ScoresListItem key={k} score={score}/>
      })}
    </TableBody>
  </Table>
  return <div>
    {scores?.map((score: any, k: any) => {
      return <ScoresListItem key={k} score={score}/>
    })}
  </div>
};

export default ScoresList;