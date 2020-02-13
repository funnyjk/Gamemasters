import React from 'react';
import MutationInput from "../../MutationInput";
import {UPDATE_SESSION} from "../../../graphql/Session";

interface IUpdateSession {
  sessionId: string;
  label?: string;
  defaultValue: any;
  name: string;
  type?: string;
  disabled?: boolean;
}

const UpdateSession = ({sessionId, defaultValue, name, type = "text", disabled = false, label}: IUpdateSession) => {

  const updateOptions = {
    variables: {
      sessionId
    }
  };
  if(type != "text")  {
    return <div>

    </div>
  }
  return <MutationInput label={label} disabled={disabled} mutation={UPDATE_SESSION} options={updateOptions} type={type} name={name} defaultValue={defaultValue} optionsData={"sessionData"}/>

};

export default UpdateSession;