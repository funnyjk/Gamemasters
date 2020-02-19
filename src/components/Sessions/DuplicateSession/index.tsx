import React from 'react';
import {FileCopyOutlined} from '@material-ui/icons'
interface IDuplicateSession {

}

/**
 * TODO: add ability to copy existing session and related scores
 * First create new session with same game and tournament
 * then for each score on the previous session create new score with same player connected to the new session
 */
const DuplicateSession = ({}: IDuplicateSession) => {
  return <div>
    <FileCopyOutlined/>
  </div>
};

export default DuplicateSession;