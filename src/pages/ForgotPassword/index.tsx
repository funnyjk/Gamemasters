import React, {useState} from 'react';
import {FORGOT_PASSWORD, FORGOT_PASSWORD_VARS} from "../../pages/authentication";
import MutationButton from "../../components/MutationButton";
import {TextField} from "@material-ui/core";
import Button from "muicss/lib/react/button";
import {useMutation} from "@apollo/react-hooks";
import {Alert} from "@material-ui/lab";

interface IForgotPassword {

}

const ForgotPassword = ({}: IForgotPassword) => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [forgotPassword] = useMutation<any, FORGOT_PASSWORD_VARS>(FORGOT_PASSWORD, {
    onCompleted({forgotPassword}) {
      setMsg(forgotPassword);
    },
    variables: {
      email
    }
  });

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    forgotPassword();
  }
  return <div>
    {msg && <Alert severity={"warning"}>{msg}</Alert>}
    <form onSubmit={handleSubmit} className={"user__form"}>
    <TextField id="email"
               autoComplete={"email"}
               type={"email"}
               variant="filled" label="Email" value={email} onChange={e => setEmail(e.target.value)}/>
               <div>
                 <Button variant="contained" type="submit" color={"primary"}>Forgot Password</Button>

               </div>
    </form>
  </div>
};

export default ForgotPassword;