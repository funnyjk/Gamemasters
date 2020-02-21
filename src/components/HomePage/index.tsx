import React, {useContext, useEffect} from 'react';
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Context from "../../context/pageContext/context";
import {setPage} from "../../context/pageContext/actions";
import logo from "../../logo.png";
import {Container} from "@material-ui/core";

const HomePage = () => {
  const {dispatch} = useContext(Context);
  useDocumentTitle("Home");
  useEffect(()=>{
    dispatch(setPage("home"))
  },[]);

  return (
    <Container>
      <img className={"logo"} src={logo}/>
      <br/>
      <strong>SITE UNDER CONSTRUCTION</strong>
    </Container>
  );
};

export default HomePage;
