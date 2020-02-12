import React, {useContext, useEffect} from 'react';
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Context from "../../context/pageContext/context";
import {setPage} from "../../context/pageContext/actions";

const HomePage = () => {
  const {dispatch} = useContext(Context);
  useDocumentTitle("Home");
  useEffect(()=>{
    dispatch(setPage("home"))
  },[]);

  return (
    <div>
      Home Page
    </div>
  );
};

export default HomePage;
