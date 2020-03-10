import React, {useState} from 'react';
import {Divider, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import CreateField from "./CreateField";
import {useMutation} from "@apollo/react-hooks";
import {createGame, UPDATE_GAME, UPDATE_GAME_VARS} from "../../graphql/Game";

interface ISelectCreate {
  options: Array<any>;
  label: string;
  value: any;
  onChange: any
}

const SelectCreate = ({options, label, value, onChange}: ISelectCreate) => {
  const [create, setCreate] = useState(false);
  const [newGameName, setNewGameName] = useState("");
  const [createNew, {loading, error, data}] = createGame("New Game");
  const [updateGame] = useMutation<any, UPDATE_GAME_VARS>(UPDATE_GAME);

  const _onChange = ({target}: any) => {
    if(!target.value) {
      setCreate(true);
      createNew();
    }
  };

  const updateGameName = () => {
    updateGame({
      variables: {
        gameId: data.createGame.id,
        gameData: {
          name: newGameName
        }
      }
    });
    onChange(data.createGame.id);
    setNewGameName("");
    setCreate(false);
  };

  return <FormControl>
    {(create) ? <div>
      <TextField name="name" value={newGameName}
                 label={"Game Name"}
                 onChange={({target}) => setNewGameName(target.value)}
                 onBlur={updateGameName}
      />
      </div>
      // <CreateField updateFunction={createFunction} toggle={setCreate} returnValue={setValue}/>
      :
      <React.Fragment>
        <InputLabel>{label}</InputLabel>
        <Select onChange={(e) => onChange(e.target.value)} value={value}>
          <MenuItem value={""} onSelect={()=>setCreate(true)}>Create New Game</MenuItem>
          <Divider/>
          {options?.map((option: any, key: any) => {
            return <MenuItem value={option.id} key={key}>{option.name}</MenuItem>
          })}
          {!options?.length && <MenuItem disabled={true}>None</MenuItem>}
        </Select>
      </React.Fragment>}
  </FormControl>
};

export default SelectCreate;