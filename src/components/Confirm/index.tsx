import React, {useState} from 'react';
import {Button} from "muicss/react";


interface IConfirm {
  action: VoidFunction;
  initState: boolean;
  children: any
}

interface IConfirmToggle extends IConfirm {
  label: any;
}

interface IConfirmAction extends Omit<IConfirmToggle, 'action'>{

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

export const ConfirmToggleChildren = ({action, initState, label, children}: IConfirmToggle) => {
  const [viewConfirm, setViewConfirm] = useState(initState);
  return <div>
    <Button color={"danger"} onClick={() => setViewConfirm(!viewConfirm)}>{label}</Button>
    {viewConfirm && <div>
        {children}
        <Button color={"primary"} onClick={() => setViewConfirm(false)}>Cancel</Button>
        <Button color={"danger"} onClick={() => action()}>Confirm</Button>
    </div>
    }
  </div>
};

export const ConfirmChildAction = ({initState, label, children}: IConfirmAction) => {
  const [viewConfirm, setViewConfirm] = useState(initState);
  return <div>
    <Button color={"danger"} onClick={() => setViewConfirm(!viewConfirm)}>{label}</Button>
    {viewConfirm && <div>
        <Button color={"primary"} onClick={() => setViewConfirm(false)}>Cancel</Button>
        {children}
    </div>
    }
  </div>
};

export default Confirm;