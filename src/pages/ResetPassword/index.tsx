import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {IconButton, TextField} from "@material-ui/core";
import Button from "muicss/lib/react/button";
import {useMutation} from "@apollo/react-hooks";
import {RESET_PASSWORD, RESET_PASSWORD_VARS} from "../authentication";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Alert} from "@material-ui/lab";

interface IResetPassword {

}

const ResetPassword = ({}: IResetPassword) => {
  const {token, id} = useParams();
  const [viewPass, setViewPass] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [resetPassword] = useMutation<any, RESET_PASSWORD_VARS>(RESET_PASSWORD, {
    onCompleted({resetPassword}) {
      setMsg(resetPassword);
    },
    onError: error => {
        setError(error.graphQLErrors[0].message);
    },
    variables: {
      token,
      id,
      newPassword: password
    }
  });
  const validateForm = () => {
    return !(validatePasswordMatch() && validateFormLength())
  }

  function validatePasswordMatch() {
    return password === confirmPassword;
  }

  function validateFormLength() {
    return (password.length > 0 && confirmPassword.length > 0);
  }
  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    resetPassword();
  }
  return <div>
    {msg && <Alert severity={"warning"}>{msg}</Alert>}
    {error && <Alert severity={"error"}>{error}</Alert>}

    <form onSubmit={handleSubmit} className={"user__form"}>
      <div>

      <TextField id="password"
                 autoComplete={"new-password"}
                 type={(viewPass) ? 'text' : 'password'}
                 variant="filled" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <TextField id="confirm-password"
                 autoComplete={'new-password'}
                 type={(viewPass)? 'text' : 'password'}
                 variant="filled" label="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
        <IconButton
          tabIndex={-1}
          aria-label="toggle password visibility"
          onClick={()=>setViewPass(!viewPass)}>
          {viewPass ? <Visibility/> : <VisibilityOff/>}
        </IconButton>
      </div>
      <div>
        <Button disabled={validateForm()} variant="contained" type="submit" color={"primary"}>Set Password</Button>
      </div>
    </form>
  </div>
};

export default ResetPassword;