import React, {useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {GET_GAMES} from "../../../graphql/Game";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

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


  return <div className={"item_page"}>
    <FormControl className={"player_list"}>
      <InputLabel id="select-game-label">Select Game</InputLabel>

      <Select labelId="select-player-label" onChange={onChange} value={value}>
        {games?.map((game: any, key: any) => {
          return <MenuItem value={game.id} key={key}>{game.name}</MenuItem>
        })}

        {!games?.length && <MenuItem disabled={true}>No Games</MenuItem>}
      </Select>
    </FormControl>
  </div>
};

export default GamesSelect;