import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useQuery} from "@apollo/react-hooks";
import {GET_TOURNAMENTPLAYER, GET_TOURNAMENTPLAYER_VARS} from "../../../graphql/TournamentPlayer";
import {Panel} from "muicss/react";
import {useToggleIsEdit} from "../../../hooks/useToggleIsEdit";
import DeleteTournamentPlayer from "../deleteTournamentPlayer";
import {Card, CardActions, CardContent, Table, TableCell, TableHead, TableRow, Typography, TableBody} from "@material-ui/core";

interface ITournamentPlayerItem {

}

const TournamentPlayerItem = ({}: ITournamentPlayerItem) => {
  const [isEdit] = useToggleIsEdit();

  const {tournamentPlayerId} = useParams();
  const {loading, data} = useQuery<any, GET_TOURNAMENTPLAYER_VARS>(GET_TOURNAMENTPLAYER, {
    variables: {
      tournamentPlayerId
    }
  });

  if(loading) return <div>Loading</div>;
  if(!data) return <div>No TournamentPlayer</div>;
  const {tournamentPlayer} = data;
  const {player, scores} = tournamentPlayer
  return <Card className={"card"}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        <Link to={`/players/${player.id}`}>{player.name}</Link>
      </Typography>
      {/*<TableContainer component={Paper}>*/}
        <Table size="small" aria-label="a dense table">
      <TableHead>
      <TableRow>
        <TableCell>Session</TableCell>
        <TableCell>Game</TableCell>
        <TableCell align="right">Score</TableCell>
      </TableRow>
      </TableHead>
      <TableBody>
        {scores?.map((score: any, k:number) => {
          return <TableRow key={k}>
            <TableCell>{score.session.name}</TableCell>
            <TableCell>{score.session.game.name}</TableCell>
            <TableCell align="right">{score.score}</TableCell>
          </TableRow>
        })}
      </TableBody>
        </Table>
    </CardContent>
    <CardActions>
        {isEdit && <DeleteTournamentPlayer className={"expand"} size={"small"} tournamentPlayer={tournamentPlayer}
                                           tournament={tournamentPlayer.tournament} disabled={!isEdit}/>}

    </CardActions>
  </Card>
};

export default TournamentPlayerItem;