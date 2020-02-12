import {useEffect} from "react";

const useDocumentTitle = (title: string) => {
  useEffect(()=> {
    document.title = "Gamemasters " + title
  }, [title]);
};

export default useDocumentTitle;