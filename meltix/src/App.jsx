import React from "react"
import Loader from "./components/Loader"
import Header from "./components/Header"
import Main from "./components/Main"

export default function App(){

  const [isLoading, setIsLoading] = React.useState(true)
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading or data fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second fake load

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      const fadeTimer = setTimeout(() => {
        setShowLoader(false);
      }, 500); // match loader fade-out
      return () => clearTimeout(fadeTimer);
    }
  }, [isLoading]);

  return (
    <>
      {showLoader && <Loader fadeOut={!isLoading}/> }
      {!isLoading && ( 
        <div className="app-content fade-in">
          <Header/>
          <Main/>
        </div>
      ) }
    </>
  );
}