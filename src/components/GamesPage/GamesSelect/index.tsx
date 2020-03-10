import React, {useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {createGame, GET_GAMES} from "../../../graphql/Game";
import {FormControl, FormGroup, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import SelectCreate from "../../SelectCreate";

interface IGamesSelect {
  value: any;
  onChange: any;
}

const GamesSelect = ({value, onChange}: IGamesSelect) => {
  const {error, loading, data} = useQuery(GET_GAMES);

  if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if(loading) return <div>Loading</div>;
  if (!data) return <div>No Games</div>;

  const {games} = data;

  const onclickTest = () => {
    console.log("TEST")
  }

  return <SelectCreate label={"Games"} options={games} value={value} onChange={onChange}/>

  // return <FormControl className={"player_list"}>
  //     <InputLabel id="select-game-label">Select Game</InputLabel>
  //   <Select labelId="select-player-label" onChange={onChange} value={value}>
  //     {games?.map((game: any, key: any) => {
  //         return <MenuItem value={game.id} key={key}>{game.name}</MenuItem>
  //       })}
  //
  //       {!games?.length && <MenuItem disabled={true}>No Games</MenuItem>}
  //     </Select>
  //   </FormControl>
};

export default GamesSelect;