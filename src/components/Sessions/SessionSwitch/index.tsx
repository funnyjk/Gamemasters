import React from 'react';
import {Link, useLocation, useRouteMatch} from 'react-router-dom';
import CreateSession from "../CreateSession";
import SessionsList from "../SessionsList";
import SessionItem from "../SessionItem";

interface ISessionSwitch {
  tournament: any
}

// const SessionSwitch = ({tournament}: ISessionSwitch) => {
//   const location = useLocation();
//   const match = useRouteMatch();
//   const {state}: any = location;
//   if (state?.session) {
//     const {session} = state;
//     return <div>
//       <div className={"component--item"}>
//         <Link to={`${match.url}`}>Sessions</Link>
//         <SessionItem tournament={tournament} session={session}/>
//       </div>
//     </div>
//   } else {
//     return <div>
//       <pre>{JSON.stringify(location, null, 2)}</pre>
//         <CreateSession tournament={tournament}/>
//         <SessionsList tournament={tournament}/>
//     </div>
//   }
// };

// export default SessionSwitch;