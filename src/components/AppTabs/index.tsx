import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {Appbar} from 'muicss/react';
import './styles';
import CreateButton from "../CreateButton";
import Context from '../../context/pageContext/context';
import {setPage} from "../../context/pageContext/actions";
import User from "../User";



interface ITabs {

}

const AppTabs = ({}: ITabs) => {
  const {state, dispatch} = useContext(Context);


  const useTo = (path: string, state: any) => {
    return {
      pathname: path,
      state
    }
  };

  const changePage = (payload: any) => {
    console.log(payload);
    dispatch(setPage(payload))
  };

  return <Appbar className={"nav"}>
    <table className={"nav__table mui-list--inline"}>
      <tbody>
      <tr className={"nav__table__row"}>

        <td className={"nav__item mui-list--inline mui--appbar-height"}>
            <li>
              <NavLink exact={true} to={useTo('/',"")} className={"mui-btn mui-btn--primary"}>Home</NavLink>
            </li>
            <li className={"nav__item"}>
              <NavLink to={useTo('/players',"players")} className={"mui-btn mui-btn--primary"}>Players</NavLink>
            </li>
            <li className={"nav__item"}>
              <NavLink to={useTo('/tournaments', "tournaments")} className={"mui-btn mui-btn--primary"}>Tournaments</NavLink>
            </li>
            <li className={"nav__item"}>
              <NavLink to={useTo('/games', "games")} className={"mui-btn mui-btn--primary"}>Games</NavLink>
            </li>
        </td>


        <td className={"nav__item--right mui--appbar-height"}>
          <User/>
          <CreateButton />
        </td>
      </tr>
      </tbody>

    </table>
  </Appbar>
};

export default AppTabs;