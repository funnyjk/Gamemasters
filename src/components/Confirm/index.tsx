import React, {useState} from 'react';
import {Button} from "muicss/react";

interface IConfirm {
  action: VoidFunction;
  initState: boolean;
  children: any
}

const Confirm = ({action, initState, children}: IConfirm) => {
  const [viewConfirm, setViewConfirm] = useState(initState);
  return <div>
    <Button color={"danger"} onClick={() => setViewConfirm(!viewConfirm)}>{children}</Button>
    {viewConfirm && <div>
        <Button color={"primary"} onClick={() => setViewConfirm(false)}>Cancel</Button>
        <Button color={"danger"} onClick={() => action()}>Confirm</Button>
    </div>
    }
  </div>

};

export default Confirm;