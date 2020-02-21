import React, {useState} from 'react';
import useAuthentication from "../../../hooks/useAuthentication";
import Confirm, {ConfirmToggleChildren} from "../../Confirm";
import {TextField} from "@material-ui/core";
import PasswordInput from "../../PasswordInput";

interface IChangePassword {

}

const ChangePassword = ({}: IChangePassword) => {
  const auth = useAuthentication();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  return <div>
   <ConfirmToggleChildren action={()=>auth.changePassword(oldPassword, newPassword)} initState={false} label={"Change Password"}>
     <PasswordInput password={oldPassword} id={"old-password"} label={"Old Password"} setPassword={setOldPassword}/>
     <PasswordInput password={newPassword} id={"new-password"} label={"New Password"} setPassword={setNewPassword}/>
     <PasswordInput password={newConfirmPassword} id={"confirm-password"} label={"Confirm New Password"} setPassword={setNewConfirmPassword}/>
   </ConfirmToggleChildren>
  </div>
};

export default ChangePassword;