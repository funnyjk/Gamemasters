import React from 'react';
import {Link, useRouteMatch, useParams, useLocation, matchPath} from "react-router-dom";
import './style';
import UpdateScore from "../../UpdateScore";
import {TableCell, TableRow} from "@material-ui/core";
import DeleteScore from "../../DeleteScore";
import {useToggleIsEdit} from "../../../../hooks/useToggleIsEdit";

interface IScoresListItem {
  score: any
}

const ScoresListItem = ({score}: IScoresListItem) => {
  const [isEdit] = useToggleIsEdit();
  // const location = useLocation();
  // const {params} = matchPath(location.pathname, {
  //   path: '/tournaments/:tournamentId/:sessionId'
  // });
  // const {tournamentId, sessionId} = params;

  const match = useRouteMatch();
  const {player} = score.player;
  return <TableRow>
    <TableCell>
      {player.name}
    </TableCell>
    <TableCell>
      <UpdateScore score={score}/>
    </TableCell>
    <TableCell align={"right"}>
      <DeleteScore scoreId={score.id} disabled={!isEdit}/>

      {/*<Link className={"score-list--item--link"} to={`${match.url}/${score.id}`}>GOTO</Link>*/}
    </TableCell>
  </TableRow>;
  return <div className={"score-list--item"}>
    <div className={"score-list--item--score"}>
      <UpdateScore score={score}/>
    </div>
    <div className={"score-list--item--name"}>
      {player.name}
    </div>
    {/*<Link to={`/tournaments/${tournamentId}/${sessionId}/${score.id}`}>GOTO</Link>*/}
    <Link className={"score-list--item--link"} to={`${match.url}/${score.id}`}>GOTO</Link>
  </div>;
};

export default ScoresListItem;